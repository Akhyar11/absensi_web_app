export interface Absensi {
  id_absensi: string;
  id_siswa: string;
  id_jadwal: string;
  id_mapel: string;
  kehadiran: boolean;
  keterangan: string;
  waktu_absen: Date;
}
