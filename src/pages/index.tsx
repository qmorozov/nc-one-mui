import axios from 'axios';
import { useState, useMemo, ChangeEvent } from 'react';
import { GetStaticProps } from 'next';
import {
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  TableContainer,
  TablePagination
} from '@mui/material';

interface IStudent {
  id: number;
  studentName: string;
  courseName: string;
  moduleName: string;
  lessonName: string;
  progress: number;
}

interface IMain {
  studentsData: IStudent[];
}

const PAGE_SIZE = 5;

export const getStaticProps: GetStaticProps<IMain> = async () => {
  try {
    const studentsResponse = await axios.get<IStudent[]>(
      'https://mocki.io/v1/edc04af0-8455-439e-93a5-b700c4fe99a6'
    );

    return {
      props: {
        studentsData: studentsResponse.data
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};

const Main = ({ studentsData }: IMain) => {
  const [students, setStudents] = useState<IStudent[]>(studentsData);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [orderBy, setOrderBy] = useState<keyof IStudent>('studentName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(PAGE_SIZE);

  const handleSort = (property: keyof IStudent) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setSelectedRow(null);
  };

  const sortedStudents = useMemo(() => {
    const orderMultiplier = order === 'asc' ? 1 : -1;

    return students.slice().sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return orderMultiplier * aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return orderMultiplier * (aValue - bValue);
      } else {
        return 0;
      }
    });
  }, [students, orderBy, order]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const visibleStudents = sortedStudents.slice(start, end);

  return (
    <>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ cursor: 'pointer', userSelect: 'none' }}>
              <TableCell onClick={handleSort('id')}>
                <Button variant="text">№</Button>
              </TableCell>
              <TableCell onClick={handleSort('studentName')}>
                <Button variant="text">Student Name</Button>
              </TableCell>
              <TableCell onClick={handleSort('courseName')}>
                <Button variant="text">Course Name</Button>
              </TableCell>
              <TableCell onClick={handleSort('moduleName')}>
                <Button variant="text">Module Name</Button>
              </TableCell>
              <TableCell onClick={handleSort('lessonName')}>
                <Button variant="text">Lesson Name</Button>
              </TableCell>
              <TableCell onClick={handleSort('progress')}>
                <Button variant="text">Progress</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleStudents.map(
              ({
                id,
                studentName,
                courseName,
                moduleName,
                lessonName,
                progress
              }) => (
                <TableRow key={id} onClick={() => setSelectedRow(id)}>
                  <TableCell sx={{ userSelect: 'none' }} className="body-cell">
                    {id}
                  </TableCell>
                  <TableCell>{studentName}</TableCell>
                  <TableCell>{courseName}</TableCell>
                  <TableCell>{moduleName}</TableCell>
                  <TableCell>{lessonName}</TableCell>
                  <TableCell onClick={() => setSelectedRow(id)}>
                    {progress}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <div className="edit-progress">
          <TextField
            value={students.find((s) => s.id === selectedRow)?.progress || ''}
            onChange={(event) => {
              const value = parseInt(event.target.value, 10);
              if (!isNaN(value)) {
                const updatedStudents = students.map((s) =>
                  s.id === selectedRow ? { ...s, progress: value } : s
                );
                setStudents(updatedStudents);
              }
            }}
            required
          />
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setSelectedRow(null);
            }}
          >
            Close
          </Button>
        </div>
      )}
      <TablePagination
        sx={{ userSelect: 'none' }}
        rowsPerPageOptions={[
          5,
          10,
          25,
          { value: students.length, label: 'All' }
        ]}
        page={page}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Main;
