import React, { createContext, useEffect, useState } from "react";

export const LangContext = createContext();

const LanguageProvider = ({ children }) => {
  const weblanguages = {
    eng: {
      totalsales: "Total Sales",
      totalincome: "Total İncome",
      dailyvisits: "Daily Visits",
      totalorders: "Total Orders",
      dashboard: "Dashboard",
      customers: "Customers",
      products: "Products",
      statistics: "Statistics",
      topcustomers:"Top Customers",
      servicetitle: "Title",
      servicebody: "Body",
      add: "Add",
      name:"NAME",
      email:"EMAIL",
      location:"LOCATION",
      phone:"PHONE",
      age:"Age",
      totalexpenses:"TOTAL EXPENSES ",
      totalorderstwo: "TOTAL ORDERS",
      selecttextfirstpart:"Showing 1 to ",
      selecttextsecondpart:" of entries",
      totalproducts:"Total Products",
      title:"TITLE",
      price:"PRICE",
      category:"CATEGORY",
      image:"IMAGE",
      rating:"RATING",
    },
    aze: {
      totalsales: "Ümümi satışlar",
      totalincome: "Ümumi  Gəlirlər",
      dailyvisits: "Günlük Görüşlər",
      totalorders: "Ümümi Sifarişlər",
      dashboard: "Panel",
      customers: "Müştərilər",
      products: "Məhsullar",
      statistics: "Statistika",
      topcustomers:"Əsas Müştərilər",
      servicetitle: "Başlıq",
      servicebody: "Əsas Hissə",
      add: "Əlavə et",
      name:"AD",
      email:"MAİL ÜNVANI",
      location:"MƏKAN",
      phone:"TELEFON",
      age:"Yaşı",
      totalexpenses:"ÜMUMİ XƏRCLƏR",
      totalorderstwo: "ÜMUMİ SİFARİŞLƏR",
      selecttextfirstpart:"1-dən  ",
      selecttextsecondpart:" qədər məlumatları göstər",
      totalproducts:"Bütün Məhsullar",
      title:"BAŞLIQ",
      price:"QİYMƏT",
      category:"KATEQORİYA",
      image:"ŞƏKİL",
      rating:"REYTİNQ"


      
    },
    tur: {
      totalsales: "Toplam Satış",
      totalincome: "Toplam Gelir",
      dailyvisits: "Günlük Ziyaretler",
      totalorders: "Toplam Siparişler",
      dashboard: "Gösterge Paneli",
      customers: "Müşteriler",
      products: "Ürünler",
      statistics: "İstatistikler",
      topcustomers:"En İyi Müşteriler",
      servicetitle: "Başlık",
      servicebody: "Esas Kısım",
      add: "Eklemek",
      name:"İSİM",
      email:"E-POSTA ÜNVANI",
      location:"KONUM",
      phone:"TELEFON",
      age:"Yaşı",
      totalexpenses:"TOPLAM GİDERLER",
      totalorderstwo: "TOPLAM SİPARİŞLER",
      selecttextfirstpart:"1-den  ",
      selecttextsecondpart:" kadar bilgileri göster",
      totalproducts:"Tüm Ürünler",
      title:"BAŞLIK",
      price:"FİYAT",
      category:"KATEGORİ",
      image:"RESIM",
      rating:"DERECE"


    },
  };

 
  const [language, setLanguage] = useState(localStorage.getItem("localization"));

  useEffect(() => {
    localStorage.setItem("localization", "eng");
  }, [language]);



  useEffect(() => {
    if (localStorage.getItem("localization")) {
      setLanguage(localStorage.getItem("localization"));
    }
  }, []);

  return (
    <LangContext.Provider value={{ language, setLanguage, weblanguages }}>
      {children}
    </LangContext.Provider>
  );
};

export default LanguageProvider;


