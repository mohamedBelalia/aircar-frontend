import React from 'react'

const TestTable = () => {
  return (
    <div className="flex flex-col">

  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Model</th>
              <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pick Up Date</th>
              <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drop Off Date</th>
              <th  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
            </tr>
          </thead>
          <tbody className="bg-white">
          <tr className='bg-gray-100'>
                    <td className='py-2 px-4 text-center border border-gray-500'>Mohamed</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>mohamedbelalia@gmail.com</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>Bmw g43</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>12-05-2023 14:30</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>09-07-2023 09:30</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>450 $</td>
                </tr>

                <tr className='bg-gray-100'>
                    <td className='py-2 px-4 text-center border border-gray-500'>Mohamed</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>mohamedbelalia@gmail.com</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>Bmw g43</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>12-05-2023 14:30</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>09-07-2023 09:30</td>
                    <td className='py-2 px-4 text-center border border-gray-500'>450 $</td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  )
}

export default TestTable