import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getCourseById, getCourses } from '../../query/Courses';
import CourseCard from './CourseCard';
import { createNewFoto, deleteAlbums, getAlbum, getAlbums } from '../../query/Albums';
import { Button } from 'react-bootstrap';
import { faker } from '@faker-js/faker/locale/en';

export const FavouritesPage = (): any => {
  const { favourites } = useAppSelector((state) => state.github);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState([]);
  const [open, setOpen] = useState(false);

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
    });
  }, []);

  // useEffect(() => {
  //   deleteAlbums('63ea177ac531f06c1ecf9690').then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  const addFoto = (): void => {
    const title = faker.name.jobType();
    const ref = faker.image.abstract(150, 150, true);
    createNewFoto('63e12e2c2ac7a41f25932576', title, ref).then((data) => {
      console.log(data);
    });
  };

  const getAlbumByid = (): void => {
    getAlbum('63e12e2c2ac7a41f25932579').then((data) => {
      console.log(data);
    });
  };

  if (favourites.length === 0 && courses.length === 0) return <p className="text-center">No items.</p>;

  return (
    <>
      <div className="flex justify-content-center pt-3 mx-3 w-auto">
        <Button className="btn btn-warning" type="button" onClick={() => addFoto()}>
          + Add Foto
        </Button>
        <Button className="btn btn-warning ms-3" type="button" onClick={() => getAlbumByid()}>
          Get Album
        </Button>
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
