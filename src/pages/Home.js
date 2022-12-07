import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import '../style/home.css';
import Swal from 'sweetalert2';

export default function Home() {
  const [buku, setBuku] = useState([]);

  const getAll = () => { //menampilkan semua data
    axios
      .get("http://localhost:8000/daftarBuku")
      .then((res) => {
        setBuku(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };

  useEffect(() => { //mengaktifkan method
    getAll();
  }, []);
  
  const deleteUser = async (id) =>  { //method delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/daftarBuku/" + id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
          )
          window.location.reload();
      }
    })
    getAll();
  };

  return (
    <div className="container my-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Pengarang</th>
            <th>Tahun Terbit</th>
            {localStorage.getItem("id") !== null ? <th>Aksi</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {buku.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.judul}</td>
              <td>{book.deskripsi}</td>
              <td>{book.pengarang}</td>
              <td>{book.tahunTerbit}</td>
              {localStorage.getItem("id") !== null ? (
              <td>
                <Button
                  variant="danger"
                  className="mx-1"
                  onClick={() => deleteUser(book.id)}
                  >
                   Hapus
                  </Button>
                  <a href={"/edit/" + book.id} > {/* beda page*/}
                    <Button variant="warning" className="mx-1">
                      Ubah
                    </Button>
                  </a>
              </td> 
              ) : (<></>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
