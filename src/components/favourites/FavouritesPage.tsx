import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getCourseById, getCourses } from '../../query/Courses';
import CourseCard from './CourseCard';

export const FavouritesPage = (): any => {
  const { favourites } = useAppSelector((state) => state.github);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  useEffect(() => {
    getCourseById(2).then((data) => {
      console.log(data);
      setCourse(data);
    });
    console.log(course);
  }, []);

  if (favourites.length === 0 && courses.length === 0) return <p className="text-center">No items.</p>;

  return (
    <>
      <div className="flex justify-content-center pt-3 w-auto">
        <ul className="list-none">
          {favourites.map((f) => (
            <li key={f}>
              <a href={f} target="_blank">
                {f}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-100 d-inline-flex">
        {courses && courses.map((data, index) => <CourseCard course={data} key={index} />)}
      </div>
    </>
  );
};
