import axios from 'axios';
import React, { useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap';
import '../style/navbar.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");

  const history = useHistory();

  const handleClose = () => setShow(false); //membuat kondisi, false = tidak ditampilkan
  const handleShow = () => setShow(true); //true = ditambilkan

  const addUser = async (e) => { //method tambah
    e.preventDefault();

    const data = {
      judul : judul,
      deskripsi : deskripsi,
      pengarang : pengarang,
      tahunTerbit : tahunTerbit
    }

    await axios
    .post("http://localhost:8000/daftarBuku/", data)
    Swal.fire(
      'Success',
      'Data berhasil ditambahkan!',
      'success'
    )
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      alert("Terjadi kesalahan " + error);
    });
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Perpustakaan</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Tabel</a>
        </li>

        {localStorage.getItem("id") !== null ? (
          <>
          <li className="nav-item">
            <button className="btn" onClick={handleShow}>Tambah Buku</button>
          </li>
          <li className="nav-item float-right">
            <a className="btn" onClick={logout}>Logout</a>
          </li>
          </>
        ) : (
          <li className="nav-item float-right">
            <a className="btn" href="/login">Login</a>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>

{/* membuat modal */}
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton className='header'>
      <Modal.Title>Add User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={addUser} method="POST">
        <div className="mb-3">
          <Form.Label>
            <strong>Judul</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control placeholder="Masukkan Judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
          </InputGroup>
        </div>
        <div className="mb-3">
          <Form.Label>
            <strong>Deskripsi</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control placeholder="Masukkan Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
          </InputGroup>
        </div>
        <div className="mb-3">
          <Form.Label>
            <strong>Pengarang</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control placeholder="Masukkan Pengarang" value={pengarang} onChange={(e) => setPengarang(e.target.value)} required />
          </InputGroup>
        </div>
        <div className="mb-3">
          <Form.Label>
            <strong>Tahun Terbit</strong>
          </Form.Label>
          <InputGroup className="d-flex gap-3">
            <Form.Control type="date" placeholder="Masukkan Tahun Terbit" value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} required />
          </InputGroup>
        </div>
        <button className="mx-1 button-btl btn btn-danger" onClick={handleClose}>Close</button>
        <button type="submit" className="mx-1 buoton btn btn-primary" onClick={handleClose}>Save</button>
      </Form>
    </Modal.Body>
  </Modal>
  </div>
)
}
