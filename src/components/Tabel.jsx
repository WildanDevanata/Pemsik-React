// components/Table.jsx
import React from 'react';

const Table = ({data, onEdit, onDelete}) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr>
                    <th className="px-4 py-2 border">NIM</th>
                    <th className="px-4 py-2 border">Nama</th>
                    <th className="px-4 py-2 border">Alamat</th>
                    <th className="px-4 py-2 border">Umur</th>
                    <th className="px-4 py-2 border">Program Studi</th>
                    <th className="px-4 py-2 border">Aksi</th>
                </tr>
                </thead>
                <tbody>
                {data && data.length > 0 ? (
                    data.map(student => (
                        <tr key={student.id}>
                            <td className="px-4 py-2 border">{student.nim}</td>
                            <td className="px-4 py-2 border">{student.nama}</td>
                            <td className="px-4 py-2 border">{student.alamat}</td>
                            <td className="px-4 py-2 border">{student.umur}</td>
                            <td className="px-4 py-2 border">{student.progdi?.nama}</td>
                            <td className="px-4 py-2 border text-center">
                                <button
                                    onClick={() => onEdit(student.id, student.nama)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(student.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="px-4 py-2 text-center">Tidak ada data</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;