import '../App.css';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from "../components/Button.jsx";
import Table from "../components/Tabel.jsx";
import Header from "../layouts/Header.jsx";
import axios from "axios";
import Sider from "../layouts/Sider.jsx";
import Footer from "../layouts/Footer.jsx";
import ModalTambah from "../layouts/ModalTambah.jsx";

function AdminLayout() {
    return (
        <div className="bg-gray-100">
            <div className="flex min-h-screen">
                <Sider />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <Content />
                    <Footer />
                </div>
            </div>
            <ModalTambah />
        </div>
    );
}

const Content = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newStudent, setNewStudent] = useState({
        progdi_id: '',
        nim: '',
        nama: '',
        alamat: '',
        umur: ''
    });

    useEffect(() => {
        fetchMahasiswa();
    }, []);

    const fetchMahasiswa = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token Tidak Ditemukan',
                text: 'Harap login terlebih dahulu',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get('http://demo-api.syaifur.io/api/mahasiswa', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.code === 200) {
                setData(response.data.data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengambil Data',
                    text: response.data.message,
                    confirmButtonColor: '#dc3545'
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data mahasiswa',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewStudent({ progdi_id: '', nim: '', nama: '', alamat: '', umur: '' }); // Reset form
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
    
        // Validate the new student data
        if (!newStudent.nim.trim() || !newStudent.nama.trim() || !newStudent.alamat.trim() || !newStudent.umur) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Error',
                text: 'Semua field harus diisi',
                confirmButtonColor: '#dc3545'
            });
            return;
        }
    
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token Tidak Ditemukan',
                text: 'Harap login terlebih dahulu',
                confirmButtonColor: '#dc3545'
            });
            return;
        }
    
        setIsLoading(true);
        try {
            // Send the newStudent object in the correct format
            const response = await axios.post('http://demo-api.syaifur.io/api/mahasiswa', newStudent, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.data.code === 200) {
                setData(prevData => [...prevData, response.data.data]);  // Add the new student to your state
                handleCloseModal();
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Mahasiswa berhasil ditambahkan',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error adding student:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: error?.response?.data?.message || 'Gagal menambahkan mahasiswa',
                confirmButtonColor: '#dc3545'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token Tidak Ditemukan',
                text: 'Harap login terlebih dahulu',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        try {
            const result = await Swal.fire({
                title: 'Konfirmasi Hapus',
                text: 'Data yang sudah dihapus tidak dapat dikembalikan',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, Hapus',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                setIsLoading(true);

                const response = await axios.delete(`http://demo-api.syaifur.io/api/mahasiswa/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.code === 200) {
                    setData(prevData => prevData.filter(student => student.id !== id));

                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil dihapus',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Menghapus',
                text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus data',
                confirmButtonColor: '#dc3545'
            });
            await fetchMahasiswa();
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (id, currentNim, currentNama, currentAlamat, currentUmur) => {
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token Tidak Ditemukan',
                text: 'Harap login terlebih dahulu',
                confirmButtonColor: '#dc3545'
            });
            return;
        }
    
        try {
            const { value: formValues, isConfirmed } = await Swal.fire({
                title: 'Edit Data Mahasiswa',
                html: `
                    <input id="nim" class="swal2-input" value="${currentNim}" placeholder="NIM" required>
                    <input id="nama" class="swal2-input" value="${currentNama}" placeholder="Nama Mahasiswa" required>
                    <input id="alamat" class="swal2-input" value="${currentAlamat}" placeholder="Alamat" required>
                    <input id="umur" class="swal2-input" value="${currentUmur}" placeholder="Umur" required type="number">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    const nim = document.getElementById("nim").value.trim();
                    const nama = document.getElementById("nama").value.trim();
                    const alamat = document.getElementById("alamat").value.trim();
                    const umur = document.getElementById("umur").value.trim();
    
                    if (!nim || !nama || !alamat || !umur) {
                        Swal.showValidationMessage('Semua kolom harus diisi!');
                        return false;  // Ensure this returns false if validation fails
                    }
    
                    return { nim, nama, alamat, umur };
                }
            });
    
            if (isConfirmed && formValues) {
                const { nim, nama, alamat, umur } = formValues;
    
                setIsLoading(true);
    
                // Update the student data via PUT request
                const response = await axios.put(`http://demo-api.syaifur.io/api/mahasiswa/${id}`, {
                    nim,
                    nama,
                    alamat,
                    umur
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                if (response.data.code === 200 && response.data.data) {
                    // Update state with the new data
                    setData(prevData =>
                        prevData.map(student =>
                            student.id === id
                                ? { ...student, nim, nama, alamat, umur }
                                : student
                        )
                    );
    
                    await Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data berhasil diperbarui',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            }
        } catch (error) {
            console.error('Error updating:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Gagal Memperbarui',
                text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui data',
                confirmButtonColor: '#dc3545'
            });
            await fetchMahasiswa(); // Refetch to get updated data
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <>
            <div className="flex justify-between mb-1 p-4 bg-blue-50">
                <h2 className="text-xl font-semibold">LIST MAHASISWA</h2>
                <Button
                    label="Tambah"
                    className="bg-green-500 text-white"
                    onClick={handleOpenModal}
                    disabled={isLoading}
                />
            </div>

            <main className="flex-grow p-4 bg-blue-50">
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Table
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Tambah Mahasiswa</h2>
                        <form onSubmit={handleAddStudent}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Nama</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nama}
                                    onChange={(e) => setNewStudent({
                                        ...newStudent,
                                        nama: e.target.value
                                    })}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nim" className="block text-gray-700">NIM</label>
                                <input
                                    id="nim"
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={newStudent.nim}
                                    onChange={(e) => setNewStudent({ ...newStudent, nim: e.target.value })}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    label="Batal"
                                    className="bg-gray-500 text-white mr-2"
                                    onClick={handleCloseModal}
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
};

export default AdminLayout;
