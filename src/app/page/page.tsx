"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

interface CandyItem {
  name: string;
  Image: string;
  company: string;
  itemname: string;
  count: number;
}

export default function App() {
  const [data, setData] = useState<CandyItem[]>([]);
  const [addedItems, setAddedItems] = useState<CandyItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<CandyItem>({
    name: "",
    Image: "",
    company: "",
    itemname: "",
    count: 0,
  });

  useEffect(() => {
    axios
      .get(
        "https://candyshopapi--suthadas.repl.co/products?fbclid=IwAR0tfkkFMtC0XAjZXOBMGLJT57FwaDP3gO5REvpOVBGWz7v_upJAPh9Qi0Y"
      )
      .then((response) => {
        setData(
          response.data.map((item: CandyItem) => ({
            ...item,
            count: 0,
          }))
        );
      });
  }, []);

  const handleIncrement = (index: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], count: newData[index].count + 1 };
      return newData;
    });
  };

  const handleReduce = (index: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      if (newData[index].count > 0) {
        newData[index] = { ...newData[index], count: newData[index].count - 1 };
      }
      return newData;
    });
  };

  const handleAdd = (index: number) => {
    const selectedItem = data[index];
    setAddedItems((prevAddedItems) => [...prevAddedItems, selectedItem]);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(addedItems[index]);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedItems = [...addedItems];
      updatedItems[editIndex] = formData;
      setAddedItems(updatedItems);
      setEditIndex(null);
      setFormData({
        name: "",
        Image: "",
        company: "",
        itemname: "",
        count: 0,
      });
    }
  };
  const handleDelete = (index: number) => {
    const updatedItems = [...addedItems];
    updatedItems.splice(index, 1);
    setAddedItems(updatedItems);
  };

  return (
    <div className="App">
      <div className="row">
        {data.map((val, idx) => (
          <div key={idx} className="col">
            <h3>{val.name}</h3>
            <img src={val.Image} alt={val.name} width="200" height="200" />
            {" | "}
            <span>{val.company}</span>

            {/* ... (rest of your code) */}
          </div>
        ))}
      </div>
      <div>
        <h2>รายการที่เพิ่ม</h2>
        <table>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อสินค้า</th>
              <th>จำนวน</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {addedItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.itemname}</td>
                <td>{item.count}</td>
                <td>
                  {editIndex === index ? (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={handleSaveEdit}
                      >
                        บันทึก
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditIndex(null)}
                      >
                        ยกเลิก
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(index)}
                    >
                      แก้ไข
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
