
const Members = () => {
  const members = [
    {
      firstName: 'Ibtisam',
      lastName: 'ahmad',
      email: 'Ahmed.Ibtisam@Yahoo.Com',
      role: 'Owner',
      status: 'Active'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-end mb-6">
        <button className="bg-[#08B882] text-white px-4 py-2 rounded-lg">
          Invite New Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-4 text-gray-600">First Name</th>
              <th className="pb-4 text-gray-600">Last Name</th>
              <th className="pb-4 text-gray-600">Email</th>
              <th className="pb-4 text-gray-600">Role</th>
              <th className="pb-4 text-gray-600">Status</th>
              <th className="pb-4 text-gray-600">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="border-t">
                <td className="py-4">{member.firstName}</td>
                <td className="py-4">{member.lastName}</td>
                <td className="py-4">{member.email}</td>
                <td className="py-4">{member.role}</td>
                <td className="py-4">{member.status}</td>
                <td className="py-4">
                  <button className="text-[#08B882]">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Showing Results</span>
          <select className="border rounded-lg px-2 py-1">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-lg text-gray-600">Previous</button>
          <button className="px-3 py-1 bg-[#08B882] text-white rounded-lg">1</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">2</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">3</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">4</button>
          <span>...</span>
          <button className="px-3 py-1 border rounded-lg text-gray-600">32</button>
          <button className="px-3 py-1 border rounded-lg text-gray-600">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Members; 