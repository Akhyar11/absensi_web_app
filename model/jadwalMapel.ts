export interface JadwalMapel {
  id_jadwal_mapel: string;
  id_guru: string;
  id_kelas: string;
  id_mapel: string;
  hari: "senin" | "selasa" | "rabu" | "kemis" | "jumat";
  jam: 1 | 2 | 3 | 4;
}
