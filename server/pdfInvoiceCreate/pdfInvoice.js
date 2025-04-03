import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function pdfCreateInvoice(invoiceData) {
  try {
    // Where to temporarily store the PDF
    const pdfPath = path.join(__dirname, "invoice.pdf");

    // Create a new PDF document
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    // Pipe the PDF into a writable stream
    doc.pipe(fs.createWriteStream(pdfPath));

    // -----------------------
    // 1. HEADER SECTION
    // -----------------------
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("E-commerce", 50, 45)
      .fontSize(10)
      .text("SCO 296 Canara Bank Building, Second Floor, Sec-20, Panchkula", 50, 70)
      .moveDown();

    // Right side: Invoice details
    // Use updatedAt, createdAt, or today's date for "Date"
    const invoiceDate = invoiceData.updatedAt 
      ? new Date(invoiceData.updatedAt).toLocaleDateString()
      : new Date().toLocaleDateString();

    doc
      .fontSize(16)
      .text("Invoice", 400, 45)
      .fontSize(10)
      .text(`Order ID: ${invoiceData.orderId}`, 400, 65)
      .text(`Date: ${invoiceDate}`, 400, 95)
      .moveDown();

    doc.moveTo(50, 110).lineTo(550, 110).stroke("#007bff");

    // -----------------------
    // 2. CUSTOMER DETAILS
    // -----------------------
    doc
      .fontSize(14)
      .text("Customer Details", 50, 130)
      .fontSize(10)
      .text(`Name: ${invoiceData.CustomerName}`, 50, 150)
      .text(`Email: ${invoiceData.CustomerEmail}`, 50, 165)
      .text(`Address: ${invoiceData.CustomerAddress}`, 50, 180)
      .moveDown();

    // -----------------------
    // 3. TABLE OF ITEMS
    // -----------------------
    const tableTop = 210;
    generateTableHeader(doc, tableTop);
    let rowY = tableTop + 25;

    // Loop over cartItems (not "items")
    invoiceData.cartItems.forEach((item) => {
      generateTableRow(
        doc,
        rowY,
        item.productName,
        item.productBrand,
        item.productSize,
        `₹${item.productPrice.toLocaleString()}`,
        item.quantity,
        `₹${item.subTotal.toLocaleString()}`
      );
      rowY += 25;
    });

    // -----------------------
    // 4. TOTAL SECTION
    // -----------------------
    doc
      .fontSize(10)
      .text(`Total Quantity: ${invoiceData.totalQuantity}`, 50, rowY + 30, {
        align: "right",
        width: 500,
      })
      .text(
        `Total Amount: ₹${invoiceData.totalAmount.toLocaleString()}`,
        50,
        rowY + 45,
        { align: "right", width: 500 }
      )
      .text(`Status: ${invoiceData.status}`, 50, rowY + 75, {
        align: "right",
        width: 500,
      });

    // Finalize the PDF
    doc.end();

    // Wait until PDF is fully written before sending email
   
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.NODE_MAIL_ID,
          pass: process.env.NODE_MAILER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Generate HTML body using your invoiceTemplate function
      let mailOptions = {
        from: `"E-commerce" <${process.env.NODE_MAIL_ID}>`,
        to: invoiceData.CustomerEmail,
        subject: "Invoice",
        text: "Your invoice is attached, thank you for shopping with us!",
        attachments: [
          {
            filename: `${invoiceData._id}-invoice.pdf`,
            path: pdfPath,
          },
        ],
      };

      // Send email with attachment
      await transporter.sendMail(mailOptions);

      // Clean up (delete) the PDF file after sending
    fs.unlinkSync(pdfPath);
  } catch (error) {
    console.error("Error creating invoice PDF:", error.message);
  }
}

/**
 * Helper function: Generate Table Header
 */
function generateTableHeader(doc, y) {
  doc
    .fontSize(10)
    .fillColor("white")
    .rect(50, y, 500, 20)
    .fill("#007bff");

  doc
    .fillColor("white")
    .text("Product", 55, y + 5)
    .text("Brand", 155, y + 5)
    .text("Size", 225, y + 5)
    .text("Price", 280, y + 5)
    .text("Quantity", 350, y + 5)
    .text("Sub Total", 420, y + 5);
}

/**
 * Helper function: Generate Table Row
 */
function generateTableRow(
  doc,
  y,
  product,
  brand,
  size,
  price,
  quantity,
  subTotal
) {
  doc
    .fontSize(10)
    .fillColor("#000")
    .text(product, 55, y)
    .text(brand, 155, y)
    .text(size, 225, y)
    .text(price, 280, y)
    .text(quantity, 350, y)
    .text(subTotal, 420, y);

  // Horizontal line
  doc
    .strokeColor("#cccccc")
    .lineWidth(0.5)
    .moveTo(50, y + 15)
    .lineTo(550, y + 15)
    .stroke();
}

export default pdfCreateInvoice;
