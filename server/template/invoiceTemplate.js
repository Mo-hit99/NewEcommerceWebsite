export function invoiceTemplate(address ,orderID, date, customerName, customerEmail, customerAddress, cartItems, totalQuantity, totalAmount, updateDate, orderStatus) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Invoice</title>
    <style>
      /* Global Styles */
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
      }
      .invoice-container {
        max-width: 800px;
        margin: 0 auto;
        background: #fff;
        padding: 30px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      /* Header */
      .invoice-header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #007bff;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .company-details h1 {
        margin: 0;
        font-size: 28px;
        color: #007bff;
      }
      .company-details p,
      .invoice-details p {
        margin: 2px 0;
        color: #555;
        font-size: 14px;
      }
      .invoice-details h2 {
        margin: 0;
        font-size: 20px;
        color: #333;
      }
      /* Customer Info */
      .invoice-info {
        margin-bottom: 20px;
      }
      .invoice-info h2 {
        font-size: 20px;
        margin-bottom: 5px;
        color: #333;
      }
      .invoice-info p {
        margin: 2px 0;
        color: #555;
        font-size: 14px;
      }
      /* Table Styles */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      table th,
      table td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
        font-size: 14px;
      }
      table th {
        background-color: #007bff;
        color: #fff;
        font-weight: normal;
      }
      /* Total Section */
      .total-section {
        text-align: right;
        margin-top: 20px;
      }
      .total-section h3 {
        margin: 5px 0;
        font-size: 16px;
      }
      .status {
        font-weight: bold;
        color: #28a745;
      }
      /* Responsive adjustments */
      @media (max-width: 600px) {
        .invoice-header {
          flex-direction: column;
          text-align: center;
        }
        .invoice-details {
          margin-top: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <!-- Header -->
      <div class="invoice-header">
        <div class="company-details">
          ${address}
        </div>
        <div class="invoice-details">
          <h2>Invoice</h2>
          <p><strong>Order ID:</strong>${orderID}</p>
          <p><strong>Date:</strong>${date}</p>
        </div>
      </div>

      <!-- Customer Details -->
      <div class="invoice-info">
        <h2>Customer Details</h2>
        <p><strong>Name:</strong>${customerName}</p>
        <p><strong>Email:</strong>${customerEmail}</p>
        <p>
          <strong>Address:</strong>
          ${customerAddress}
        </p>
      </div>

      <!-- Order Items -->
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          ${cartItems.forEach((item) => {
            return `
            <td>${item.productName}</td>
            <td>${item.productBrand}</td>
            <td>${item.productSize}</td>
            <td>₹${item.productPrice}</td>
            <td>${item.quantity}</td>
            <td>₹${item.subTotal}</td>
            `;
          }
          )}
          </tr>
        </tbody>
      </table>

      <!-- Total and Status -->
      <div class="total-section">
        <h3>Total Items: ${totalQuantity}</h3>
        <h3>Total Amount: ${totalAmount}</h3>
        <h3>Estimated Delivery:${updateDate}</h3>
        <p>
          Status:
          <span class="status">${orderStatus}</span>
        </p>
      </div>
    </div>
  </body>
</html>

</body>
</html>
    `;
}
