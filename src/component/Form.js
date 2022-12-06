import axios from 'axios';
import React, {useState} from 'react'
import '../style/form.css'

export default function Form() {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [pengarang, setPengarang] = useState("");
    const [tahunTerbit, setTahunTerbit] = useState("");

    // method tambah
    const addBuku = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/daftarBuku", {
                judul : judul,
                deskripsi : deskripsi,
                pengarang : pengarang,
                tahunTerbit : tahunTerbit
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    } 

  return (
    <div>
        <h1>From Tambah Buku</h1>
        <form onSubmit={addBuku}> 
            <div className="input">
                <label htmlFor="judul">Judul : </label>
                <input type="text" name="judul" id="judul" value={judul} onChange={(e) => setJudul(e.target.value)} required/>
            </div>
            <div className="input">
                <label htmlFor="deskripsi">Deskripsi : </label>
                <input type="text" name="deskripsi" id="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required/>
            </div>
            <div className="input">
                <label htmlFor="pengarang">Pengarang : </label>
                <input type="text" name="pengarang" id="pengarang" value={pengarang} onChange={(e) => setPengarang(e.target.value)}/>
            </div>
            <div className="input">
                <label htmlFor="tahunTerbit">Tahun Terbit : </label>
                <input type="date" name="tahunTerbit" id="tahunTerbit" value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} />
            </div>
            <br />
            <button className='add' type='submit'>Tambahkan</button>
        </form>
    </div>
  )
}

// type date untuk tanggal