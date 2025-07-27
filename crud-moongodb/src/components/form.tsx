"use client"; // Needed if this is in a Next.js Server Component file

import React, { useState } from "react";

type RecordData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: string;
};

const Form = () => {
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // Records state
  const [record, setRecord] = useState<RecordData[]>([]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(form.address)
    try {
    const res = await fetch("/api/record/", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(form),
    })

    // if(res){
    //     alert("message data send",)
    // }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
  >
    <h2 className="text-2xl font-bold text-center text-gray-800">Contact Form</h2>

    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Phone
      </label>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
        Address
      </label>
      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Enter your address"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Message
      </label>
      <input
        type="text"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Enter your message"
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      >
        Submit
      </button>
    </div>
  </form>
</div>

  );
};

export default Form;



// import React, { useState } from 'react'


// type RecordData = {
// id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   message: string;
//   createdAt: string;
// }

// const form = () => {
//     // use for get data from frorm 
//     const [form, SetForm] = useState({
//     name: " ",
//     email: " ",
//     phone: " ",
//     address: " ",
//     message: " ",
//     })
//     // onchange input form data use for update 
//     const [record, SetRecord] = useState<RecordData[]>([]);

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const{name, value} = e.target;
//         SetForm((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };


//     const handleSubmit = async (e: React.FormEvent<HTMLInputElement>)=>{
//         e.preventDefault();
//         try{

//         }catch(error){

//         }
    
// }
//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="">Name</label>
//                 <input 
//                 name='name' 
//                 value={form.name}
//                 onChange={handleChange} 
//                 placeholder='enter your name' />
//             </div>
//                         <div>
//                 <label htmlFor="">Email</label>
//                 <input 
//                 name='email' 
//                 value={form.email}
//                   onChange={handleChange} 
//                 placeholder='enter your Email' />
//             </div>
//                         <div>
//                 <label htmlFor="">Phone</label>
//                 <input 
//                 name='phone' 
//                 value={form.phone}
//                   onChange={handleChange} 
//                 placeholder='enter your Phone Number' />
//             </div>
//             <div>
//                 <label htmlFor="">Address</label>
//                 <input 
//                 name='address' 
//                 value={form.address}
//                   onChange={handleChange} 
//                 placeholder='enter your Address' />
//             </div>
//                         <div>
//                 <label htmlFor="">message</label>
//                 <input 
//                 name='message' 
//                 value={form.message}
//                   onChange={handleChange} 
//                 placeholder='enter your Message' />
//             </div>
//             <div>
//                 <button type='submit'>Submit</button>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default form