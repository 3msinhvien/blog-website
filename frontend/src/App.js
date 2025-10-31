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
      <div>
        <h1>Do Tung's Blog</h1>
        <p>Welcome to my Blog</p>
      </div>
    )
  }

  function About() {
    return (
      <div>
        <h2>About me</h2>
        <p>This is the about page.</p>
      </div>
    )
  }

  function NoMatch() {
    return (
      <div>
        <h2>404: Page Not Found</h2>
        <p>The page you're looking for does not exist.</p>
      </div>
    )
  }


  // Post component

  function Posts() {
    return (
      <div>
        <h2>Blog</h2>
        <Outlet />
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
      return <div>Post not found</div>;
    }
    const {title, content} = post;
    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    )
  }
  return (
    <Router>
      <nav>
        <Link to='/'>
          Home
        </Link>
        <Link to='/about'>
          About
        </Link>
        <Link to='/post'>
          Blog
        </Link>
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
