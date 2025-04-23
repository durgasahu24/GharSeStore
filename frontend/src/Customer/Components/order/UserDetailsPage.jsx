function UserDetailsCard({ address }) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold">User Details</h3>
        <p className="text-gray-700">Name : {address.firstName} {address.lastName}</p>
        <p className="text-gray-700">Phone Number : {address.mobile}</p>
        <p className="text-gray-700">Address : {address?.streetAddress},{address?.zipCode},{address?.state}</p>
      </div>
    );
  }
  
  export default UserDetailsCard;
  