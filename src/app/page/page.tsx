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
    const newData = [...data];
    newData[index] = { ...newData[index], count: newData[index].count + 1 };
    setData(newData);
  };
  
  const handleReduce = (index: number) => {
    if (data[index].count > 0) {
      const newData = [...data];
      newData[index] = { ...newData[index], count: newData[index].count - 1 };
      setData(newData);
    };
  }
  

  const handleAdd = (index: number) => {
    const selectedItem = data[index];
    setAddedItems((prevAddedItems) => [...prevAddedItems, selectedItem]);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    // ดึงข้อมูลจำนวนเดิมจาก addedItems
    const previousCount = addedItems[index].count;
    // ตั้งค่า formData ด้วยข้อมูลจำนวนเดิม
    setFormData({ ...addedItems[index], count: previousCount });
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
  const handleReset = (index: number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], count: 0 };
    setData(newData);
  }
  

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
            <span>{val.company}</span>
            <div className="item-actions">
              <button onClick={() => handleIncrement(idx)}>+</button>
              <span>{val.count}</span>
              <button onClick={() => handleReduce(idx)}>-</button>
              <button onClick={() => handleAdd(idx)}>เลือก</button>
              <button onClick={() => handleReset(idx)}>Reset</button> 
              
            </div>
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
            </tr>
          </thead>
          <tbody>
          {addedItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  {editIndex === index ? (
                    // โหมดแก้ไข
                    <>
                      <input
                        type="number"
                        value={formData.count}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            count: parseInt(e.target.value),
                          })
                        }
                      />
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
                    // โหมดแสดง
                    <>
                      {item.count}
                    
                      <button style={{margin: '10px'}}
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(index)}
                      >
                        แก้ไข
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(index)}
                      >
                        ลบ
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
