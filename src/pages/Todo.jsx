import React from 'react'
import { useState, useEffect } from 'react';
import Logo from '../assets/images/Logo.svg'
import Icon_add from '../assets/images/icon_add.svg'
import Icon_delete from '../assets/images/icon_delete.svg';
import { Empty } from 'antd';

export default function Todo() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState(data);
  const [value, setValue] = useState('');

  const ulStyle = 'flex w-full flex-col justify-around space-y-6 mx-6';
  const liStyle = 'flex items-center justify-between mt-6 mx-8';
  const listStyle = 'container max-w-[500px] md:px-0';
  const sectionStyle = 'w-full mx-auto flex flex-col items-center mt-4 bg-white rounded-[10px] box_shadow';

  const notFinish = 'text-[14px] text-brown';
  const isFinish = 'text-[14px] text-gray-300 line-through';const activeStyle = 'py-4 border-b-2 border-b-primary-light w-full text-center text-third text-sm font-bold text-brown active';
  const style = 'py-4 border-b-2 border-b-primary-light w-full text-center text-third text-sm font-bold text-brown hover:border-b-primary';

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

  const total = data.filter((item) => !item.finish);
  const nickName = localStorage.getItem('nickName');
  return (
    <>
    {/* Navbar */}
    <nav className="flex flex-col  items-center mt-4 space-y-4 container md:flex-row md:items-center md:justify-between md:container pt-6">
      <img className="w-[300px]" src={Logo} alt="Logo" />
      <div className="flex items-center space-x-6">
        <p className="text-base text-brown font-bold ml-4"> {nickName}'s Todo List</p>
        <input type="button" className="text-brown text-sm bg-primary py-1 px-5 font-medium rounded-lg tracking-widest hover:text-white" value="登出" />
      </div>
    </nav>
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
            {todo.map(({ id, finish, text }, index) => (
              <li className={liStyle} key={id}>
                <div className="flex space-x-4 items-center">
                  <input type="checkbox" name="" id="" className="w-5 h-5 rounded-md" defaultChecked={!!finish} onClick={() => { FinishStatus(id); }} />
                  <p className={finish ? isFinish : notFinish}>{text}</p>
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
