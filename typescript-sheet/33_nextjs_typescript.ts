// ═══════════════════════════════════════════════════════════════
// 33_nextjs_typescript.ts — Next.js with TypeScript
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════
// Page Types (App Router)
// ═══════════════════════════════════════

import {
    GetServerSideProps,
    GetStaticPaths,
    GetStaticProps,
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
    NextPage
} from "next";

// Basic Page Component
interface HomePageProps {
    title: string;
    description: string;
}

const HomePage: NextPage<HomePageProps> = ({ title, description }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

// ═══════════════════════════════════════
// getServerSideProps
// ═══════════════════════════════════════

interface Product {
    id: number;
    name: string;
    price: number;
}

export const getServerSideProps: GetServerSideProps<{
    products: Product[];
}> = async (context) => {
    const { query } = context;
    const category = query.category as string | undefined;

    // Fetch data from API
    const response = await fetch(
        `https://api.example.com/products${category ? `?category=${category}` : ""}`
    );
    const products: Product[] = await response.json();

    return {
        props: {
            products
        }
    };
};

// Type inference from getServerSideProps
type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// ═══════════════════════════════════════
// getStaticProps
// ═══════════════════════════════════════

interface BlogPost {
    slug: string;
    title: string;
    content: string;
    publishedAt: string;
}

export const getStaticProps: GetStaticProps<{
    post: BlogPost;
}> = async (context) => {
    const { params } = context;
    const slug = params?.slug as string;

    // Fetch post data
    const post: BlogPost = {
        slug,
        title: `Post: ${slug}`,
        content: "Content here...",
        publishedAt: new Date().toISOString()
    };

    return {
        props: { post },
        revalidate: 60 // ISR: regenerate every 60 seconds
    };
};

// Type inference from getStaticProps
type StaticProps = InferGetStaticPropsType<typeof getStaticProps>;

// ═══════════════════════════════════════
// getStaticPaths
// ═══════════════════════════════════════

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch all post slugs
    const posts = [{ slug: "hello-world" }, { slug: "typescript-guide" }];

    return {
        paths: posts.map((post) => ({
            params: { slug: post.slug }
        })),
        fallback: "blocking" // or true or false
    };
};

// ═══════════════════════════════════════
// API Routes
// ═══════════════════════════════════════

import { NextApiRequest, NextApiResponse } from "next";

// Typed API handler
type ApiResponseData = {
    success: boolean;
    data?: Product;
    error?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponseData>
) {
    const { method, query, body } = req;
    const id = query.id as string;

    switch (method) {
        case "GET":
            // Return product
            res.status(200).json({
                success: true,
                data: { id: parseInt(id), name: "Product", price: 99 }
            });
            break;

        case "POST":
            // Create product
            const newProduct: Product = body;
            res.status(201).json({ success: true, data: newProduct });
            break;

        case "PUT":
            // Update product
            res.status(200).json({ success: true, data: body });
            break;

        case "DELETE":
            // Delete product
            res.status(200).json({ success: true });
            break;

        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).json({ success: false, error: "Method not allowed" });
    }
}

// ═══════════════════════════════════════
// Middleware
// ═══════════════════════════════════════

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Protect routes
    if (pathname.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Add headers
    const response = NextResponse.next();
    response.headers.set("x-custom-header", "value");

    return response;
}

// ═══════════════════════════════════════
// App Router (Next.js 13+)
// ═══════════════════════════════════════

// app/page.tsx
/*
export default function Page(): JSX.Element {
    return <h1>Hello, Next.js!</h1>;
}
*/

// app/layout.tsx
/*
export const metadata = {
    title: "My App",
    description: "Description"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
*/

// app/products/[id]/page.tsx
/*
interface ProductPageProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`https://api.example.com/products/${id}`);
    return res.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProduct(params.id);

    return (
        <div>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
        </div>
    );
}
*/

// app/api/users/route.ts
/*
import { NextResponse } from "next/server";

export async function GET() {
    const users = await fetchUsers();
    return NextResponse.json({ users });
}

export async function POST(request: Request) {
    const body = await request.json();
    const newUser = await createUser(body);
    return NextResponse.json({ user: newUser }, { status: 201 });
}
*/

// ═══════════════════════════════════════
// Environment Variables
// ═══════════════════════════════════════

// types/env.d.ts
/*
declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_URL: string;
        DATABASE_URL: string;
        JWT_SECRET: string;
        STRIPE_SECRET_KEY: string;
    }
}
*/

// Usage
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ═══════════════════════════════════════
// Image Component Types
// ═══════════════════════════════════════

import Image from "next/image";

interface ProductImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
}

function ProductImage({ src, alt, width, height, priority }: ProductImageProps): JSX.Element {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="rounded-lg"
        />
    );
}

// ═══════════════════════════════════════
// Link Component Types
// ═══════════════════════════════════════

import Link from "next/link";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
}

function NavLink({ href, children, active }: NavLinkProps): JSX.Element {
    return (
        <Link
            href={href}
            className={active ? "text-blue-600" : "text-gray-600"}
        >
            {children}
        </Link>
    );
}

// ═══════════════════════════════════════
// Dynamic Imports
// ═══════════════════════════════════════

import dynamic from "next/dynamic";

const DynamicChart = dynamic(
    () => import("./Chart"),
    {
        loading: () => <p>Loading chart...</p>,
        ssr: false
    }
);

// ═══════════════════════════════════════
// next.config.js with TypeScript
// ═══════════════════════════════════════

/*
// next.config.js
/** @type {import('next').NextConfig} */
/*
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cdn.example.com'],
    },
    async redirects() {
        return [
            {
                source: '/old-page',
                destination: '/new-page',
                permanent: true,
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
*/

export { HomePage, NavLink, ProductImage };
