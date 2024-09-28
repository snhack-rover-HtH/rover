import React from 'react';

const OrderHistory: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Orders history and details:</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Order Number</th>
              <th className="text-left">Items</th>
              <th className="text-left">Date</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>5</td>
              <td>28 September, 2024</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2</td>
              <td>28 September, 2024</td>
              <td>Received</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;