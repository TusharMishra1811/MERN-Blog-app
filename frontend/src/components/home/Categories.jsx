import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled, 
} from "@mui/material";
import React from "react";
import { categories } from "../../constants/data";

import { Link, useSearchParams } from "react-router-dom";

const TableComponent = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const ButtonComponent = styled(Button)`
  margin: 20px;
  color: white;
  background: #d61c4e;
  width: 190px;
  height: 50px;
  font-family: cursive;
  border-radius: 10px;
  &:hover {
    background: #d61c4e;
    text-decoration: underline;
  }
`;

const Categories = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  return (
    <>
      <Link
        to={`/create?category=${category || ""}`}
        style={{ textDecoration: "none" }}
      >
        <ButtonComponent> Create Blog</ButtonComponent>
      </Link>
      <TableComponent>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to="/">All Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Link to={`/?category=${category.type}`}>{category.type}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </>
  );
};

export default Categories;
