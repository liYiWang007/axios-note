// 请求接口 http://jsonplaceholder.typicode.com/todos

// const { axios } = require("./axios.min");

// GET请求
function getTodos() {
  // 代码优化写法
  //  ?_limit=5 过滤前五条数据
  //  timeout 5000 加载超过5秒就停止加载
  axios
    .get("http://jsonplaceholder.typicode.com/todos?_limit=5", {
      timeout: 5000,
    })
    //不加.get 也可以
    //   axios("http://jsonplaceholder.typicode.com/todos")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err))

  // 入门
  //   axios({
  //     method: "get",
  //     url: "http://jsonplaceholder.typicode.com/todos",
  //     params: {
  //       //可以过滤数据
  //       _limit: 5, //只显示前五条
  //     },
  //   })
  //     .then((res) => showOutput(res))
  //     .catch((err) => console.log(err))
}

// POST请求
function addTodo() {
  axios
    .post("http://jsonplaceholder.typicode.com/todos", {
      userId: 1,
      id: 1,
      title: "test axios post",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err))
}

// PUT/PATCH请求
function updateTodo() {
  //请求修改单个id的数据
  // patch 返回账号内所有数据
  axios
    .patch("http://jsonplaceholder.typicode.com/todos/1", {
      title: "test axios post 改中文",
      completed: true,
    })
    //   put 请求修改单个id的数据 只会返回 修改的数据+id
    //   axios
    //   .put("http://jsonplaceholder.typicode.com/todos/1", {
    //     title: "test axios post 改中文",
    //     completed: true,
    //   })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err))
}

// 删除
function removeTodo() {
  axios
    .delete("http://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((err) => console.log(err))
}

// 批量请求 但用都只能单独引入
function getData() {
  axios
    .all([
      //请求 todo跟post json里的前五条
      axios.get("http://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("http://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    // .spread() 请求多个
    .then(axios.spread((todos, posts) => showOutput(todos)))
    //   .then((res) => showOutput(res[0])) //res[0]=显示第一个.get的数据
    .catch((err) => console.log(err))
}

// 自定义请求头 contentType
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      CopyRight: "keyName",
    },
  }

  axios
    .post(
      "http://jsonplaceholder.typicode.com/todos",
      {
        title: "test axios post 改contentType啦啦啦",
        completed: true,
      },
      config
    )
    .then((res) => showOutput(res)) //res[0]=显示第一个.get的数据
    .catch((err) => console.log(err))
}

// 数据展示
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `
}

// 事件监听
document.getElementById("get").addEventListener("click", getTodos)
document.getElementById("post").addEventListener("click", addTodo)
document.getElementById("update").addEventListener("click", updateTodo)
document.getElementById("delete").addEventListener("click", removeTodo)
document.getElementById("sim").addEventListener("click", getData)
document.getElementById("headers").addEventListener("click", customHeaders)
// document
//   .getElementById("transform")
//   .addEventListener("click", transformResponse);
// document.getElementById("error").addEventListener("click", errorHandling);
// document.getElementById("cancel").addEventListener("click", cancelToken);
