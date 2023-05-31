import React, { createContext, useState } from "react";

export const LangContext = createContext();

const LanguageProvider = ({ children }) => {
  const weblanguages = {
    eng: {
      totalsales: "Total Sales",
      totalincome: "Total İncome",
      dailyvisits: "Daily VSisits",
      totalorders: "Total Orders",
      dashboard:"Dashboard"
    },
    aze: {
      totalsales: "Ümümi satışlar",
      totalincome: "Ümumi  Gəlirlər",
      dailyvisits: "Günlük Görüşlər",
      totalorders: "Ümümi Sifarişlər",
      dashboard:"Panel"
    },
  };
  const [language, setLanguage] = useState();

  return (
    <LangContext.Provider value={{ language, setLanguage, weblanguages }}>
      {children}
    </LangContext.Provider>
  );
};

export default LanguageProvider;
