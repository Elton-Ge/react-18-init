/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as MusicImport } from './routes/music';
import { Route as AboutImport } from './routes/about';
import { Route as IndexImport } from './routes/index';
import { Route as PostsIndexImport } from './routes/posts/index';
import { Route as PostsPostIdImport } from './routes/posts/$postId';

// Create/Update Routes

const MusicRoute = MusicImport.update({
  id: '/music',
  path: '/music',
  getParentRoute: () => rootRoute,
} as any);

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const PostsIndexRoute = PostsIndexImport.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any);

const PostsPostIdRoute = PostsPostIdImport.update({
  id: '/posts/$postId',
  path: '/posts/$postId',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/about': {
      id: '/about';
      path: '/about';
      fullPath: '/about';
      preLoaderRoute: typeof AboutImport;
      parentRoute: typeof rootRoute;
    };
    '/music': {
      id: '/music';
      path: '/music';
      fullPath: '/music';
      preLoaderRoute: typeof MusicImport;
      parentRoute: typeof rootRoute;
    };
    '/posts/$postId': {
      id: '/posts/$postId';
      path: '/posts/$postId';
      fullPath: '/posts/$postId';
      preLoaderRoute: typeof PostsPostIdImport;
      parentRoute: typeof rootRoute;
    };
    '/posts/': {
      id: '/posts/';
      path: '/posts';
      fullPath: '/posts';
      preLoaderRoute: typeof PostsIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/about': typeof AboutRoute;
  '/music': typeof MusicRoute;
  '/posts/$postId': typeof PostsPostIdRoute;
  '/posts': typeof PostsIndexRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/about': typeof AboutRoute;
  '/music': typeof MusicRoute;
  '/posts/$postId': typeof PostsPostIdRoute;
  '/posts': typeof PostsIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/about': typeof AboutRoute;
  '/music': typeof MusicRoute;
  '/posts/$postId': typeof PostsPostIdRoute;
  '/posts/': typeof PostsIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/about' | '/music' | '/posts/$postId' | '/posts';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/about' | '/music' | '/posts/$postId' | '/posts';
  id: '__root__' | '/' | '/about' | '/music' | '/posts/$postId' | '/posts/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AboutRoute: typeof AboutRoute;
  MusicRoute: typeof MusicRoute;
  PostsPostIdRoute: typeof PostsPostIdRoute;
  PostsIndexRoute: typeof PostsIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  MusicRoute: MusicRoute,
  PostsPostIdRoute: PostsPostIdRoute,
  PostsIndexRoute: PostsIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/music",
        "/posts/$postId",
        "/posts/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/music": {
      "filePath": "music.tsx"
    },
    "/posts/$postId": {
      "filePath": "posts/$postId.tsx"
    },
    "/posts/": {
      "filePath": "posts/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
