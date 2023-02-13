import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getCourseById, getCourses } from '../../query/Courses';
import CourseCard from './CourseCard';
import { deleteAlbums, getAlbums } from '../../query/Albums';

export const FavouritesPage = (): any => {
  const { favourites } = useAppSelector((state) => state.github);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  useEffect(() => {
    getCourseById(2).then((data) => {
      setCourse(data);
    });
  }, []);

  useEffect(() => {
    getAlbums('abf112c7-aab9-4310-aafd-f0ff7ac148a9').then((data) => {
      setAlbums(data);
      console.log(albums);
    });
  }, []);

  useEffect(() => {
    deleteAlbums('63ea177ac531f06c1ecf9690').then((data) => {
      console.log(data);
    });
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
