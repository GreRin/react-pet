import React from 'react';
import { Card } from 'react-bootstrap';
import { ICourse } from '../../models/models';

const CourseCard = ({ course }: { course: ICourse }): any => {
  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>{course.topic}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{course.title}</Card.Subtitle>
        <Card.Text>{course.description}</Card.Text>
        <Card.Link href={course.url}>{course.url}</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
