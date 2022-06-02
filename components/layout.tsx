import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
const name = 'Duc Tran';
export const siteTitle = 'Duc Tran';

function ContactLink(children: React.ReactNode) {
	return <li></li>;
}

export default function Layout({
	children,
	home,
}: {
	children: React.ReactNode;
	home?: boolean;
}) {
	return (
		<div className="grid grid-cols-1 max-w-2xl mt-12 mx-auto mb-24 px-4">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" />
				<meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<header className="grid grid-cols-1 justify-items-center max-w-xs mx-auto shadow-xl rounded-xl p-4">
				{home ? (
					<>
						<Image
							priority
							src="/images/potrait.jpg"
							className={utilStyles.borderCircle}
							height={144}
							width={144}
							alt={name}
						/>
						<h1 className={utilStyles.heading2Xl}>{name}</h1>
						<div className="grid grid-cols-3 gap-3 w-32 items-center">
							<a
								href="https://www.linkedin.com/in/ductran99/"
								target="_blank"
								rel="noreferrer"
								className="text-inherit"
							>
								<FontAwesomeIcon icon={faLinkedin} size="1x" />
							</a>
							<a
								href="https://github.com/englishlayup"
								target="_blank"
								rel="noreferrer"
								className="text-inherit"
							>
								<FontAwesomeIcon icon={faGithubAlt} size="1x" />
							</a>
							<a
								href="/files/Resume.pdf"
								target="_blank"
								rel="noreferrer"
								className="text-inherit"
							>
								<FontAwesomeIcon icon={faIdCard} size="1x" />
							</a>
						</div>
					</>
				) : (
					<>
						<Link href="/">
							<a>
								<Image
									priority
									src="/images/potrait.jpg"
									className={utilStyles.borderCircle}
									height={108}
									width={108}
									alt={name}
								/>
							</a>
						</Link>
						<h2 className={utilStyles.headingLg}>
							<Link href="/">
								<a className={utilStyles.colorInherit}>{name}</a>
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className="mt-12">
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
}
