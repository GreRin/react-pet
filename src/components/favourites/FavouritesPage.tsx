import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { getCourseById } from '../../graphql-query/Courses';
import CourseCard from './CourseCard';
import { deleteAlbums, getAlbum, getAlbums } from '../../graphql-query/Albums';
import { Button } from 'react-bootstrap';
import { faker } from '@faker-js/faker/locale/en';
import { useCourses } from '../../hooks/courses.hook';
import { useAddFoto } from '../../hooks/add-foto.hook';

export const FavouritesPage = (): JSX.Element => {
  const { favourites } = useAppSelector((state) => state.github);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  const { coursesData, loadingCourses, error } = useCourses();
  const createFotoPromise = useAddFoto();

  useEffect(() => {
    setCourses(coursesData);
  }, [coursesData]);

  useEffect(() => {
    getCourseById(2).then((item: React.SetStateAction<never[]>) => {
      setCourse(item);
    });
  }, []);

  useEffect(() => {
    getAlbums('abf112c7-aab9-4310-aafd-f0ff7ac148a9');
  }, []);

  // useEffect(() => {
  //   deleteAlbums('63ea177ac531f06c1ecf9690').then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  const addFoto = async (): Promise<void> => {
    const title = faker.name.jobType();
    const ref = faker.image.abstract(150, 150, true);
    const albumId = '63e12e2c2ac7a41f25932579';

    createFotoPromise.then(async ({ loading, createFoto }) => {
      const foto = await createFoto(title, ref, albumId);
      console.log(foto);
    });
  };

  const getAlbumByid = (): void => {
    getAlbum('63e12e2c2ac7a41f25932579');
  };

  if (!loadingCourses && !favourites) return <p className="text-center">No items.</p>;

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
        {courses && courses.map((item, index) => <CourseCard course={item} key={index} />)}
      </div>
    </>
  );
};
