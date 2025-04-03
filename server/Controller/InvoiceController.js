import { invoiceModel } from "../model/InvoiceModel.js";
import dotenv from "dotenv";
import pdfCreateInvoice from "../pdfInvoiceCreate/pdfInvoice.js";

dotenv.config();

function generateOrderId() {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export const getInvoiceRouter = async (req, res) => {
  try {
    const {page = 1, limit = 12,search} = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } },
        { CustomerName: { $regex: search, $options: "i" } },
        { CustomerEmail: { $regex: search, $options: "i" } },
        { CustomerAddress: { $regex: search, $options: "i" } },
      ];
    }
    const getInvoice = await invoiceModel.find(query).limit(limit * 1).skip((page - 1) * limit).exec();
    const safeGetInvoice = getInvoice.map((invoice) => ({
      _id: invoice._id,
      orderId: invoice.orderId,
      CustomerName: invoice.CustomerName,
      CustomerEmail: invoice.CustomerEmail,
      CustomerAddress: invoice.CustomerAddress,
      cartItems: invoice.cartItems,
      totalQuantity: invoice.totalQuantity,
      totalAmount: invoice.totalAmount,
      estimatedDeliveryDate: invoice.estimatedDeliveryDate,
      status: invoice.status,
      statusUpdates: invoice.statusUpdates,
    }));
    const count = await invoiceModel.countDocuments(query);
    res.status(200).json({safeGetInvoice,totalPages: Math.ceil(count / limit), currentPage: page});

  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getByIdInvoiceRouter = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await invoiceModel.findById({ _id: id });
    const safeGetInvoice = {
      _id: invoice._id,
      orderId: getById.orderId,
      CustomerName: getById.CustomerName,
      CustomerEmail: getById.CustomerEmail,
      CustomerAddress: getById.CustomerAddress,
      cartItems: getById.cartItems,
      totalQuantity: getById.totalQuantity,
      totalAmount: getById.totalAmount,
      estimatedDeliveryDate: getById.estimatedDeliveryDate,
      status: getById.status,
      statusUpdates: getById.statusUpdates,
    };
    res.status(200).json(safeGetInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createInvoiceRouter = async (req, res) => {
  try {
    const {
      paymentId,
      customerName,
      customerEmail,
      customerAddress,
      cartItems,
      totalQuantity,
      totalAmount,
      estimatedDeliveryDate,
    } = req.body;

    if (!customerName || !customerEmail || !customerAddress || !cartItems) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const orderId = generateOrderId();

    // Optionally, calculate totals if not provided:
    const calculatedTotalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const calculatedTotalAmount = cartItems.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );

    const invoice = new invoiceModel({
      orderId,
      paymentId,
      CustomerName: customerName,
      CustomerEmail: customerEmail,
      CustomerAddress: customerAddress,
      cartItems,
      totalQuantity: totalQuantity || calculatedTotalQuantity,
      totalAmount: totalAmount || calculatedTotalAmount,
      estimatedDeliveryDate,
    });

    await invoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateInvoiceRouter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      CustomerName,
      productName,
      productDescription,
      ProductBrand,
      ProductColor,
      ProductSize,
      ProductPrice,
      CustomerAddress,
      CustomerEmail,
      paymentId,
      ProductImg,
      totalQuantity,
    } = req.body;
    const updateInvoice = await invoiceModel.findOneAndUpdate(
      { _id: id },
      CustomerName,
      productName,
      productDescription,
      ProductBrand,
      ProductColor,
      ProductSize,
      ProductPrice,
      CustomerAddress,
      paymentId,
      CustomerEmail,
      ProductImg,
      totalQuantity,
      { new: true }
    );
    if (!updateInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json("Invoice detail updated");
    console.log("Invoice detail updated");
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("invoice detail failed", error.message);
  }
};
export const deleteInvoiceRouter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInvoice = await invoiceModel.findOneAndDelete({ _id: id });
    res.status(200).json(deleteInvoice);
    console.log("invoice is Delete");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("invoice is not Delete");
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { status } = req.body;
    // Define allowed statuses (must match both model and frontend)
    const allowedStatuses = [
      "Order Placed",
      "Processed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const invoice = await invoiceModel.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    // Update the invoice status and log the change
    invoice.status = status;
    invoice.statusUpdates.push({ status, updatedAt: new Date() });
    
    // if status delivered
    if (status === "Delivered") {
      await pdfCreateInvoice(invoice)
      
    }
    const updatedInvoice =  await invoice.save();
    res.status(200).json({ message: "Order status updated", invoice : updatedInvoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getRemainingDeliveryDays = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await invoiceModel.findById(invoiceId);
    if (!invoice) return res.status(400).json({ message: "Invoice not found" });

    // Use createdAt as the order date (assuming this is the order placement time)
    const orderDate = new Date(invoice.createdAt);

    // Create a separate Date object for the estimated delivery date
    const estimatedDeliveryDate = new Date(invoice.createdAt);
    estimatedDeliveryDate.setDate(
      estimatedDeliveryDate.getDate() + invoice.estimatedDeliveryDate
    );

    // Calculate the remaining days
    const currentDate = new Date();
    const diffTime = estimatedDeliveryDate - currentDate;
    const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.status(200).json({
      message: "Remaining delivery days calculated",
      orderDate: orderDate.toISOString(),
      expectedDeliveryDate: estimatedDeliveryDate.toISOString(),
      remainingDays: remainingDays > 0 ? remainingDays : 0,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
