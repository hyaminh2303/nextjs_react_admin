import * as React from 'react';
import { Layout } from 'react-admin';
import CustomSidebar from './CustomSidebar';

const CustomLayout = (props: any) => <Layout {...props} sidebar={CustomSidebar} />;

export default CustomLayout;
