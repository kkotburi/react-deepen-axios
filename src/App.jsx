// import axios from "axios";
import api from "./axios/api";
import { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetID] = useState("");
  const [content, setContent] = useState("");

  // const postTodos = "http://localhost:3001/todos";

  // 조회 함수
  const fetchTodos = async () => {
    // const { data } = await axios.get(postTodos);
    const { data } = await api.get("todos");
    // console.log("data", data);
    setTodos(data);
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    api.post("/todos", inputValue);
    // setTodos([...todos, inputValue]);
    fetchTodos();
  };

  // 삭제 함수
  const onDeleteButtonClickHandler = async (id) => {
    api.delete(`/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  // 수정 함수
  const onUpdateButtonClickHandler = async () => {
    api.patch(`/todos/${targetId}`, {
      title: content,
    });

    setTodos(
      todos.map((item) => {
        if (item.id === targetId) {
          return { ...item, title: content };
        } else {
          return item;
        }
      })
    );
    return;
  };

  useEffect(() => {
    // db로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  return (
    <>
      <div>
        {/* 수정 영역 */}
        <input
          type="text"
          placeholder="수정할 ID"
          value={targetId}
          onChange={(event) => {
            setTargetID(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="수정할 Content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button onClick={onUpdateButtonClickHandler}>edit</button>
      </div>
      <div>
        {/* input 영역 */}
        <form
          onSubmit={(event) => {
            event.preventDefault();

            // 버튼 작동 시 input에 들어있는 값(state)을 이용하여 DB에 저장(post 요청)
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(event) => {
              setInputValue({
                title: event.target.value,
              });
            }}
          />
          <button type="submit">add</button>
        </form>
      </div>
      <div>
        {/* 삭제 영역 */}
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              <button onClick={() => onDeleteButtonClickHandler(item.id)}>
                delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
