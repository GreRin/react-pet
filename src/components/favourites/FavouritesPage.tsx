import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useQuery } from '@apollo/client';
import { GET_ALL_COURSES } from '../../query/Courses';
import CourseCard from './CourseCard';

export const FavouritesPage = (): any => {
  const { favourites } = useAppSelector((state) => state.github);
  const { data, loading, error } = useQuery(GET_ALL_COURSES);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!loading) {
      setCourses(data.getAllCourses);
    }
  }, []);

  console.log(courses);

  if (favourites.length === 0) return <p className="text-center">No items.</p>;

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
        {courses && courses.map((course, index) => <CourseCard course={course} key={index} />)}
      </div>
    </>
  );
};
