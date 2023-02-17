import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Empty } from 'antd';
import { GetTodoApi, AddTodoApi } from '../helpers/API'
import { useAuth } from '../helpers/Context';
import swal from 'sweetalert';

import { Header } from '../Components/Header';
import { ulStyle, liStyle, listStyle, sectionStyle, notFinish, isFinish, style } from '../helpers/Style';
import Icon_add from '../assets/images/icon_add.svg'
import Icon_delete from '../assets/images/icon_delete.svg';

export default function Todo() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState('');
  const [allStatus, setAllStatus] = useState([{
    state: '全部',
    className: 'active',
  },
  {
    state: '待完成',
    className: 'null',
  },
  {
    state: '已完成',
    className: 'null',
  }]);
  const [tabStatus, setTabStatus] = useState('全部');

  let filterTodo;
  useEffect(() => {
    switch (tabStatus) {
      case '全部':
        setTodo(data);
        break;
      case '待完成':
        filterTodo = [...data]?.filter((item) => !item.finish);
        setTodo(filterTodo);
        break;
      case '已完成':
        filterTodo = [...data]?.filter((item) => item.finish);
        setTodo(filterTodo);
        break;
    }
  }, [tabStatus, data, filterTodo]);

  const AddTodo = () => {
    setData([...data, { id: `${Number(data.length + 1)}`, text: `${value}`, finish: false }]);
    setValue('');
  };
  const FinishStatus = (id) => {
    const newData = [...todo];
    const changStatus = newData.map((newItem) => {
      if (newItem.id === id) {
        newItem.finish = !newItem.finish;
      }
      return newItem;
    });
    setData(changStatus);
  };
  const DeleteTodo = (id) => {
    const deleteTodo = data.filter((newItem) => newItem.id !== id);
    setData(deleteTodo);
  };

  function GetTodo (token){
    GetTodoApi(token)
    .then((res) =>{
      console.log(res);
      const { data:{ todos } } = res
      setTodo(todos)
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  function AddTodo2 (){

  }

  useEffect (() =>{
    GetTodo(token)
    console.log(todo);
  },[])

  const total = data.filter((item) => !item.finish);
  const nickName = localStorage.getItem('nickName');
  return (
    <>
      <Header nickName={nickName} />
      {/* Add Todo */}
      <section className="container flex items-center mt-12 max-w-[500px] md:px-0">
        <input type="text" placeholder="請輸入待辦事項" className=" px-4 py-3 rounded-[10px] w-full " value={value} onChange={(e) => setValue(e.target.value)} />
        <input
          type="button"
          className="w-10 h-10 bg-no-repeat -ml-11"
          value=""
          style={{ backgroundImage: `url(${Icon_add})` }}
          onClick={AddTodo}
        />
      </section>
      <div className={listStyle}>
        <section className={sectionStyle}>
          {/* Tab Status */}
          <ul className="flex justify-around w-full mb-6">
            {allStatus.map((item, index) => (
              <input
              type="button"
              className={style}
              value={item.state}
              key={index}
              onClick={() => {
                setTabStatus(item.state);
                const newData = allStatus;
                newData.map((newDataItem, newDataIndex) => {
                  newDataIndex === index ? (newDataItem.className = { activeStyle }) : (newDataItem.className = { style });
                });
                setAllStatus(newData);
              }}
              />
              ))}
          </ul>
          <ul className={ulStyle}>
            {/* Todo List */}
            <ul>
              {todo.length === 0 ? <Empty /> : null}
              {todo.map(({ id, compeleted_at, content }, index) => (
                <li className={liStyle} key={id}>
                  <div className="flex space-x-4 items-center">
                    <input type="checkbox" name="" id="" className="w-5 h-5 rounded-md" defaultChecked={compeleted_at} onClick={() => { FinishStatus(id); }} />
                    <p className={compeleted_at != null ? isFinish : notFinish}>{content}</p>
                  </div>
                  <input
                    type="button"
                    className="w-6 h-6"
                    value=""
                    style={{ backgroundImage: `url(${Icon_delete})` }}
                    onClick={() => DeleteTodo(id, index)}
                    />
                </li>
              ))}
            </ul>
            {/* Buttom List */}
            <li className="flex items-center justify-between py-6 mx-8">
              <p className="text-sm text-brown">
                {total.length}
                {' '}
                個待完成項目
              </p>
              <input
                type="button"
                className="text-sm text-primary"
                value="清除已完成項目"
                onClick={() => { setData(total); }}
                />
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}

