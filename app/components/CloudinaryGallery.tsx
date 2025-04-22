import React from "react";
import { getCloudinaryUrl } from "~/utils/cloudinary";
// import CloudinaryGallery from "~/components/CloudinaryGallery"; 

const publicIds = [
    //Index
  "7fa422a4-a5a2-49b5-9cde-6b1fe91c7d2e_2_ysfvar",
  "8453f772-29b5-45bd-9292-f8e20501f735_ewzhvd",
  "68adbec2-1e8f-41e6-b888-e0520a80bf64_2_ycca8m",
  "174f6ab9-d902-462a-b7c1-b2513a3e3781_1_b4otgj",
  "9b5fe0cc-ae65-4225-b90b-a7d563e925db_2_ts54t8",
  "2f31ecd7-f736-4473-9b74-0293ed14faa6_lxs0gm",
  "best-island-in-Thailand_yknta2",
  //Sia Moon Logos
"Logo-black-vector_n9te6g",
"logo-white-vector-3svg_dmz2pf",
// House Logos
"df4fcfd7-0fc7-4ac8-bd34-5a80255ce3af_zer8c7",
"5_smrtgn",
"Parents_logo_oycq6z",
];
//Hero Image
const bed1 = getCloudinaryUrl('bedroom1_mtpspt');
//Phangan Image
const phangan = getCloudinaryUrl('best-island-in-Thailand_yknta2');
//Index Images
const con1 = getCloudinaryUrl(  "9b5fe0cc-ae65-4225-b90b-a7d563e925db_2_ts54t8",);
const hero = getCloudinaryUrl(  "8453f772-29b5-45bd-9292-f8e20501f735_ewzhvd",);
const con2 = getCloudinaryUrl('2f31ecd7-f736-4473-9b74-0293ed14faa6_lxs0gm');
const box1 = getCloudinaryUrl('68adbec2-1e8f-41e6-b888-e0520a80bf64_2_ycca8m');
const box2 = getCloudinaryUrl('7fa422a4-a5a2-49b5-9cde-6b1fe91c7d2e_2_ysfvar');
const box3 = getCloudinaryUrl('e1261b8a-4301-40b2-85ca-36ab3b670059_1_zbxee1');
const box4 = getCloudinaryUrl('174f6ab9-d902-462a-b7c1-b2513a3e3781_1_b4otgj');
//House Logo
const plogo = getCloudinaryUrl('Parents_logo_oycq6z');
const llogo = getCloudinaryUrl('df4fcfd7-0fc7-4ac8-bd34-5a80255ce3af_zer8c7');
const alogo = getCloudinaryUrl('5_smrtgn');
//Logos Images
const sialogob = getCloudinaryUrl('Logo-black-vector_n9te6g');
const sialogow = getCloudinaryUrl('logo-white-vector-3svg_dmz2pf');

export default function CloudinaryGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {publicIds.map((id, index) => (
        <img
          key={index}
          src={getCloudinaryUrl(id)}
          alt={`Gallery ${index}`}
          className="w-full h-auto object-cover rounded shadow"
        />
      ))}
    </div>
  );
}