import React from 'react';
import { LinkOrgService } from './services/link-org-service'

export const linkOrgService = new LinkOrgService();

export const LinkOrgContext = React.createContext(linkOrgService);
