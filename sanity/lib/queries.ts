import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc){
  _id, title, slug, _createdAt, views, author -> { _id, name, bio, image},description, category,
    image 
}`);
