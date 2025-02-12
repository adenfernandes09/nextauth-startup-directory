import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || title match $search || author->name match $search] | order(_createdAt desc){
  _id, title, slug, _createdAt, views, author -> { _id, name, bio, image},description, category,
    image 
}`);

export const STARTUP_QUERY_FIND_BY_ID =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, title, slug, _createdAt, views, author -> { _id, name, username, bio, image},description, category,
    image, pitch
}`);

export const START_UP_QUERY_VIEW = defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, views}`)
