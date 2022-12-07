import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup  } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import '../style/edit.css';
import Swal from 'sweetalert2';

export default function Edit() {
    // deklarasi tetap untuk membuat method
    const param = useParams(); //untuk get data menampilkan data
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [pengarang, setPengarang] = useState("");
    const [tahunTerbit, setTahunTerbit] = useState("");

    const history = useHistory();

    useEffect(() => { //method get (menampilkan)
        axios
        .get("http://localhost:8000/daftarBuku/" + param.id)
        .then((response) => {
            const newBook = response.data;
            setJudul(newBook.judul);
            setDeskripsi(newBook.deskripsi);
            setPengarang(newBook.pengarang);
            setTahunTerbit(newBook.tahunTerbit)
        })
        .catch((error) => {
            alert("Terjadi kesalahan Sir!" + error);
        });
    }, []);

    const submitActionHandler = async (event) => { //menjalankan perintah put (update)
        event.preventDefault();

        await axios
        .put("http://localhost:8000/daftarBuku/" + param.id, {
            judul : judul,
            deskripsi : deskripsi,
            pengarang : pengarang,
            tahunTerbit : tahunTerbit
        })
        Swal.fire(
            'Update Berhasil',
            'Data berhasil diupdate!',
            'success'
          ) 
        .then(() => {
            history.push("/");
            window.location.reload();
        })
        .catch((error) => {
            alert("Terjadi kesalahan : " + error);
        });
    };

  return (
    <div className="edit mx-5">
        <div className="container my-5">
            <Form onSubmit={submitActionHandler}>
                <div className="name mb-3">
                    <Form.Label>
                        <strong>Judul</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Judul.."
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}  //untuk 
                        />
                    </InputGroup>
                </div>

                <div className="name mb-3">
                    <Form.Label>
                        <strong>Deskripsi</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Deskripsi.."
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="name mb-3">
                    <Form.Label>
                        <strong>Pengarang</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Pengarang.."
                        value={pengarang}
                        onChange={(e) => setPengarang(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="name mb-3">
                    <Form.Label>
                        <strong>Tahun Terbit</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        type="date"
                        placeholder="Tahun Terbit.."
                        value={tahunTerbit}
                        onChange={(e) => setTahunTerbit(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-flex justify-content-end align-items-center mt-2">
                    <button className="buton btn" type="submit">Save</button>
                </div>
            </Form>
        </div>
    </div>
  );
}
