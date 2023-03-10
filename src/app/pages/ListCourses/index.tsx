import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Courses() {
  return (
    <>
      <div>Courses Page</div>
      <Link to="/instructor/course"> Course</Link>
    </>
  );
}
