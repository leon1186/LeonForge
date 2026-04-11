import React from "react";
import { useState, useEffect } from "react";
import { getInquiries } from "../services/inquiryService";
import InquiryBar from "../components/InquiryBar";

function DashboardPage() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getInquiries();
       
        
        if (Array.isArray(data)) {
          setInquiries(data);
        } else if (data && typeof data === 'object') {
          setInquiries(data.result || data.results || data.data || []);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div>
      <InquiryBar inquiries={inquiries} />
    </div>
  );
}

export default DashboardPage;
