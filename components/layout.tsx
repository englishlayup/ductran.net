import { faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import styles from './layout.module.css';

const name = 'Duc Tran';
export const siteTitle = 'Duc Tran';

export default function Layout({
	children,
	home,
}: {
	children: React.ReactNode;
	home?: boolean;
}) {
	return (
		<div className={styles.container}>
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
			<header className={styles.header}>
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
						<ul className="flex flex-row justify-center space-x-2">
							<li className="w-10 flex justify-center">
								<a
									href="https://www.linkedin.com/in/ductran99/"
									target="_blank"
									rel="noreferrer"
									color="black"
								>
									<FontAwesomeIcon icon={faLinkedin} fixedWidth size="xs" />
								</a>
							</li>
							<li className="w-10 flex justify-center items-end">
								<a
									href="https://github.com/englishlayup"
									target="_blank"
									rel="noreferrer"
								>
									<FontAwesomeIcon icon={faGithubAlt} fixedWidth size="xs" />
								</a>
							</li>
							<li className="w-10 flex justify-center items-center">
								<a href="/files/Resume.pdf" target="_blank" rel="noreferrer">
									<FontAwesomeIcon icon={faIdCard} fixedWidth size="xs" />
								</a>
							</li>
						</ul>
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
				<div className={styles.backToHome}>
					<Link href="/">
						<a>← Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
}
