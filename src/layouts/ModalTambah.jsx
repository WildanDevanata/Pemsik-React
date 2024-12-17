import React, { useState } from "react";
import Button from "../components/Button.jsx";  // Assuming this is the reusable Button component

function ModalTambah({ isOpen, onClose, onSave, isLoading }) {
    const [newStudent, setNewStudent] = useState({
        nim: '',
        nama: '',  // Updated to 'nama' to match your desired format
        alamat: '',  // Updated to 'alamat' to match your desired format
        umur: ''     // Updated to 'umur' to match your desired format
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newStudent); // Sending the updated format
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Tambah Mahasiswa</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-gray-700">Nama</label>
                                <input
                                    id="nama"
                                    name="nama"  // Updated to 'nama' to match the format
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nama}  // Ensure binding to 'nama'
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nim" className="block text-gray-700">NIM</label>
                                <input
                                    id="nim"
                                    name="nim"  // Updated to 'nim' to match the format
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nim}  // Ensure binding to 'nim'
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alamat" className="block text-gray-700">Alamat</label>
                                <input
                                    id="alamat"
                                    name="alamat"  // Updated to 'alamat' to match the format
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.alamat}  // Ensure binding to 'alamat'
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="umur" className="block text-gray-700">Umur</label>
                                <input
                                    id="umur"
                                    name="umur"  // Updated to 'umur' to match the format
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.umur}  // Ensure binding to 'umur'
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    label="Batal"
                                    className="bg-gray-500 text-white mr-2"
                                    onClick={onClose}
                                    disabled={isLoading}
                                />
                                <Button
                                    label="Simpan"
                                    className="bg-green-500 text-white"
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalTambah;
