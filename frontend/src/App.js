import './styles.css';
import {useState, useEffect, use} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams

} from "react-router-dom"

function App() {

  const [blog, setBlog] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch ("http://localhost:8080")
      .then ((res) => {
        return res.json()
      })
      .then ((data)=> {
        setBlog(data)
      })
      .catch((error) => {
        console.error('Error fetching blog data:', error)
      })
  },[])

  const loadBlog = (slug) => {
    fetch (`http://localhost:8080/post/${slug}`)
      .then ((res) => {
        return res.json()
      })
      .then ((data) => {
        setSelected(data)
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error)
      })
  }

  function Home() {
    return (
      <div className="container">
        <main>
          <h1>Do Tung's Blog</h1>
          <p>Welcome to my blog! Here you'll find interesting articles and thoughts on various topics.</p>
        </main>
      </div>
    )
  }

  function About() {
    return (
      <div className="container">
        <main>
          <h2>About me</h2>
          <p>This is the about page where you can learn more about me and my interests.</p>
        </main>
      </div>
    )
  }

  function NoMatch() {
    return (
      <div className="container">
        <main className="error-page">
          <h2>404: Page Not Found</h2>
          <p>The page you're looking for does not exist.</p>
        </main>
      </div>
    )
  }


  // Post component

  function Posts() {
    return (
      <div className="container">
        <main>
          <h2>Blog Posts</h2>
          <Outlet />
        </main>
      </div>
    )
  }

  function PostList() {
    return (
      <ul>
        {Object.entries(blog).map(
          ([slug, {title}]) => (
            <li key={slug}>
              <Link to={`/post/${slug}`}>
                <h3>{title}</h3>
              </Link>
            </li>
          )
        )}
      </ul>
    )
  }

  function PostDetail() {
    const {slug} = useParams();
    const post = blog[slug];
    if (!post) {
      return (
        <div className="container">
          <main>
            <div>Post not found</div>
          </main>
        </div>
      );
    }
    const {title, content} = post;
    return (
      <div className="container">
        <main>
          <div className="post-detail">
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        </main>
      </div>
    )
  }
  return (
    <Router>
      <nav>
        <div className="container">
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/post'>Blog</Link>
        </div>
      </nav>
      
      <Routes>
        <Route path ='/' element={<Home />}></Route>
        <Route path ='/about' element={<About />}></Route>
        <Route path ='/post' element={<Posts />}>
          <Route index element={<PostList />} />
        </Route>
        <Route path ='/post/:slug' element={<PostDetail />}></Route>
        <Route path ='*' element={<NoMatch />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
