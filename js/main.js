// 请求接口 http://jsonplaceholder.typicode.com/todos

//https://jwt.io/ token校验
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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

// TRANSFORM 请求和响应
function transformResponse() {
  const options = {
    method: "post",
    url: "http://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello world",
    },
    // .concat() 合并多个数组
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase() //转化为大写
      return data
    }),
  }
  axios(options).then((res) => showOutput(res))
}

// ERROR处理
function errorHandling() {
  axios
    .get("http://jsonplaceholder.typicode.com/todoserror")
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status + "status")
        console.log(err.response.headers)

        if (err.response.status == 404) {
          alert("404 页面丢失")
        } else if (err.response.status >= 500) {
          alert("服务器接口出现问题")
        } else if (err.request) {
          //发起请求但没有相应 需要后端配合
          console.error(err.request)
        } else {
          //需要后端配合
          console.error(err.message)
        }
      }
    })
}

function cancelToken() {
  // source 属性用于返回模式匹配所用的文本。
  const source = axios.CancelToken.source()
  axios
    .get("http://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("request canceled", thrown.message)
      }
    })
  if (true) {
    source.cancel("request canceled")
  }
}

// 请求拦截
axios.interceptors.request.use((config) => {
    // .getTime() 获取时间 需要转化
    console.log(
    `${config.method.toUpperCase()} request sent to ${
      config.url
    } at ${new Date().getTime()}`
  )
  return config
},error=>{
    return Promise.reject(error)
})

// axios实例化
const axiosInstance =axios.create({
    baseURL:'http://jsonplaceholder.typicode.com'
})
axiosInstance.get('/comments?_limit=5').then(res=>showOutput(res))


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
document
  .getElementById("transform")
  .addEventListener("click", transformResponse)
document.getElementById("error").addEventListener("click", errorHandling)
document.getElementById("cancel").addEventListener("click", cancelToken)
