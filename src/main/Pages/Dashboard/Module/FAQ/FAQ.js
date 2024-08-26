import React, {useState} from 'react';
import classes from './FAQ.module.css'
import Title from "../../../../../components/Title/Title";
import {useTranslation} from "react-i18next";
import FAQCard from "../FAQCard/FAQCard";

const FAQ = () => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState(0);

    const faqData = [
        {title: "1. What makes 3ID different from other Web3 domain providers?", content: "3ID offers a unique combination of affordable ENS-based subdomains through off-chain storage and Layer 2 solutions. Unlike many other providers who provide network-specific domains that are not functional and practical anywhere, on 3ID, users can register affordable subdomains that are fetchable on Metamask and DApps, set their desired data records, choose among several domain extension and network options, and adjust the underlying resolving method of their domain.", id:"1"},
        {title: "2. How does 3ID ensure the security and reliability of domain resolution?", content: "3ID leverages cutting-edge technologies such as Chainlink's CCIP Read (Cross-Chain Interoperability Protocol), Cloudflare Workers, and Layer 2 networks to ensure secure and reliable domain resolution. Off-chain subdomain data is securely stored and managed using Cloudflare's infrastructure, while our integration with ENS's off-chain resolver contracts allows for fast and accurate data retrieval. Additionally, ownership of on-chain subdomains is secured through NFTs on Layer 2 networks, ensuring that users have full control over their digital identities.", id:"2"},
        {title: "3. What are the upcoming features on the 3ID platform?", content: "3ID is actively developing several innovative features to enhance the user experience. These include a subdomain marketplace where users can list, price, and sell subdomains of their domains, providing an opportunity to earn from their digital assets. Another upcoming feature is the batch subdomain service, designed for businesses that want to associate decentralized identifiers with their products at scale. These features, combined with our existing offerings, will further expand the possibilities for managing and utilizing ENS domains within the Web3 ecosystem.", id:"3"},
    ]
    return (
        <div className={`${classes.container} width-100 column jc-start ai-center mt-10`} id="FAQ">

            <Title title={t("FAQ")}/>

            <div className={`width-100 column jc-canter ai-center my-5`}>
                {faqData.map((faq , index) => <FAQCard data={faq} index={index} key={index} isOpen={isOpen} setIsOpen={setIsOpen}/>)}
            </div>

        </div>
    );
};

export default FAQ;
