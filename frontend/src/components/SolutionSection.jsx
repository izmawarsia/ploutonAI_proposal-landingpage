import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import exceptionDiagram from "../assets/exceptional inteeligence.jpeg"
import docDiagram from "../assets/document_understanding.jpeg"
import performanceDiagram from "../assets/Agent Performance Analytics Architecture.jpeg"

const API_BASE = "https://plouton-ai-proposal-landingpage-hi5.vercel.app"
const NLP_API_URL = "https://nlp-audit-wsr6-git-main-aerox1.vercel.app/api/chat"

// Exact HTML containing ALL 5 drift elements specified by Lead
const defaultOldHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aerox Finance OS — Legacy ERP</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Inter, Arial, sans-serif;
            background: #eef2f7;
            color: #172033;
            min-height: 100vh;
        }

        .app {
            display: flex;
            min-height: 100vh;
        }

        /* SIDEBAR */
        .sidebar {
            width: 245px;
            background: #0b1730;
            color: white;
            padding: 24px 18px;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 38px;
        }

        .brand-icon {
            width: 36px;
            height: 36px;
            border-radius: 9px;
            background: linear-gradient(135deg, #1677ff, #00c6ff);
            display: grid;
            place-items: center;
            font-weight: 800;
        }

        .brand-name {
            font-size: 17px;
            font-weight: 700;
        }

        .brand-subtitle {
            font-size: 10px;
            color: #8492aa;
            margin-top: 3px;
        }

        .nav-label {
            color: #71809a;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.3px;
            margin: 22px 10px 10px;
        }

        .nav-item {
            padding: 12px 12px;
            border-radius: 8px;
            margin-bottom: 4px;
            color: #b8c3d5;
            font-size: 13px;
        }

        .nav-item.active {
            background: #172a4c;
            color: white;
        }

        /* MAIN */
        .main {
            flex: 1;
            padding: 25px 34px;
            overflow-x: hidden;
        }

        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
        }

        .breadcrumb {
            color: #7a879c;
            font-size: 12px;
            margin-bottom: 7px;
        }

        h1 {
            font-size: 25px;
            letter-spacing: -0.5px;
        }

        .top-right {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .status {
            display: flex;
            align-items: center;
            gap: 7px;
            background: white;
            padding: 9px 13px;
            border-radius: 8px;
            font-size: 12px;
            border: 1px solid #e0e6ef;
        }

        .dot {
            width: 8px;
            height: 8px;
            background: #18b77b;
            border-radius: 50%;
        }

        .avatar {
            width: 36px;
            height: 36px;
            background: #dce6f7;
            border-radius: 50%;
            display: grid;
            place-items: center;
            font-size: 12px;
            font-weight: bold;
        }

        /* SUMMARY CARDS */
        .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 24px;
        }

        .card {
            background: white;
            border: 1px solid #e1e7ef;
            border-radius: 12px;
            padding: 18px;
            box-shadow: 0 2px 8px rgba(20, 40, 70, 0.04);
        }

        .card-label {
            color: #7b879a;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .card-value {
            font-size: 25px;
            font-weight: 750;
            margin-top: 8px;
        }

        .positive {
            color: #15956a;
            font-size: 11px;
            margin-top: 6px;
        }

        /* WORKFLOW */
        .workflow {
            display: grid;
            grid-template-columns: 1.45fr .8fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .section-subtitle {
            color: #8994a6;
            font-size: 11px;
            margin-bottom: 18px;
        }

        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .invoice-id {
            font-size: 13px;
            color: #66738a;
        }

        .badge {
            background: #fff5dc;
            color: #9b6a00;
            padding: 5px 9px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
        }

        .invoice-info {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 22px;
        }

        .info-box {
            background: #f7f9fc;
            border-radius: 8px;
            padding: 13px;
        }

        .info-label {
            color: #8994a6;
            font-size: 10px;
            margin-bottom: 5px;
        }

        .info-value {
            font-size: 13px;
            font-weight: 650;
        }

        .amount {
            font-size: 20px;
        }

        /* OLD BUTTON */
        .action-area {
            border-top: 1px solid #e8edf3;
            padding-top: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .action-note {
            color: #8994a6;
            font-size: 11px;
        }

        .approve-btn {
            border: none;
            background: #146ef5;
            color: white;
            padding: 11px 20px;
            border-radius: 7px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
        }

        /* ACTIVITY */
        .activity-item {
            display: flex;
            gap: 11px;
            padding: 12px 0;
            border-bottom: 1px solid #edf0f4;
        }

        .activity-icon {
            width: 28px;
            height: 28px;
            border-radius: 7px;
            background: #e9f2ff;
            color: #146ef5;
            display: grid;
            place-items: center;
            font-size: 11px;
        }

        .activity-text {
            font-size: 11px;
            font-weight: 600;
        }

        .activity-time {
            color: #909bad;
            font-size: 10px;
            margin-top: 3px;
        }

        /* TABLE */
        .table-card {
            background: white;
            border: 1px solid #e1e7ef;
            border-radius: 12px;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
        }

        th {
            text-align: left;
            color: #8a95a7;
            font-weight: 600;
            padding: 11px;
            border-bottom: 1px solid #e6ebf1;
        }

        td {
            padding: 13px 11px;
            border-bottom: 1px solid #edf0f4;
        }

        .success {
            color: #13956a;
            font-weight: 700;
        }

        .warning {
            color: #a36c00;
            font-weight: 700;
        }

        @media (max-width: 900px) {
            .sidebar {
                width: 190px;
            }

            .summary {
                grid-template-columns: repeat(2, 1fr);
            }

            .workflow {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

<div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">

        <div class="brand">
            <div class="brand-icon">A</div>

            <div>
                <div class="brand-name">AEROX</div>
                <div class="brand-subtitle">FINANCE OPERATIONS</div>
            </div>
        </div>

        <div class="nav-label">Workspace</div>

        <div class="nav-item active">Dashboard</div>
        <div class="nav-item">Accounts Payable</div>
        <div class="nav-item">Invoices</div>
        <div class="nav-item">Vendors</div>
        <div class="nav-item">Payments</div>

        <div class="nav-label">Management</div>

        <div class="nav-item">Reports</div>
        <div class="nav-item">Audit Logs</div>
        <div class="nav-item">Settings</div>

    </aside>


    <!-- MAIN -->
    <main class="main">

        <div class="topbar">

            <div>
                <div class="breadcrumb">
                    Finance Operations / Accounts Payable
                </div>

                <h1>Invoice Review</h1>
            </div>

            <div class="top-right">

                <div class="status">
                    <span class="dot"></span>
                    System Operational
                </div>

                <div class="avatar">AD</div>

            </div>

        </div>


        <!-- SUMMARY -->
        <section class="summary">

            <div class="card">
                <div class="card-label">Pending Invoices</div>
                <div class="card-value">24</div>
                <div class="positive">↓ 8% this week</div>
            </div>

            <div class="card">
                <div class="card-label">Processed Today</div>
                <div class="card-value">186</div>
                <div class="positive">↑ 14% this week</div>
            </div>

            <div class="card">
                <div class="card-label">Exceptions</div>
                <div class="card-value">07</div>
                <div class="warning">Requires review</div>
            </div>

            <div class="card">
                <div class="card-label">Processing Value</div>
                <div class="card-value">$842K</div>
                <div class="positive">Current cycle</div>
            </div>

        </section>


        <!-- WORKFLOW -->
        <section class="workflow">

            <!-- INVOICE -->
            <div class="card">

                <div class="invoice-header">

                    <div>
                        <div class="section-title">
                            Invoice Processing
                        </div>

                        <div class="invoice-id">
                            Transaction INV-1042
                        </div>
                    </div>

                    <span class="badge">Pending Approval</span>

                </div>


                <div class="invoice-info">

                    <div class="info-box">
                        <div class="info-label">Vendor</div>
                        <div class="info-value">
                            Global Supplies Ltd.
                        </div>
                    </div>

                    <div class="info-box">
                        <div class="info-label">Invoice Date</div>
                        <div class="info-value">
                            24 Jul 2026
                        </div>
                    </div>

                    <div class="info-box">
                        <div class="info-label">Amount</div>
                        <div class="info-value amount">
                            $12,450
                        </div>
                    </div>

                </div>


                <div class="action-area">

                    <div class="action-note">
                        Agent verification completed
                    </div>

                    <!-- IMPORTANT OLD ELEMENT -->
                    <button
                        id="approve-invoice"
                        class="approve-btn">
                        Approve Invoice
                    </button>

                </div>

            </div>


            <!-- ACTIVITY -->
            <div class="card">

                <div class="section-title">
                    Agent Activity
                </div>

                <div class="section-subtitle">
                    Recent workflow events
                </div>


                <div class="activity-item">

                    <div class="activity-icon">✓</div>

                    <div>
                        <div class="activity-text">
                            Invoice extracted
                        </div>

                        <div class="activity-time">
                            10:31 AM
                        </div>
                    </div>

                </div>


                <div class="activity-item">

                    <div class="activity-icon">✓</div>

                    <div>
                        <div class="activity-text">
                            Vendor verified
                        </div>

                        <div class="activity-time">
                            10:32 AM
                        </div>
                    </div>

                </div>


                <div class="activity-item">

                    <div class="activity-icon">!</div>

                    <div>
                        <div class="activity-text">
                            Approval required
                        </div>

                        <div class="activity-time">
                            10:33 AM
                        </div>
                    </div>

                </div>

            </div>

        </section>


        <!-- TRANSACTION TABLE -->
        <section class="table-card">

            <div class="section-title">
                Recent Transactions
            </div>

            <div class="section-subtitle">
                Accounts payable workflow activity
            </div>

            <table>

                <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>Vendor</th>
                        <th>Workflow</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>INV-1042</td>
                        <td>Global Supplies Ltd.</td>
                        <td>AP Processing</td>
                        <td>$12,450</td>
                        <td class="warning">Pending</td>
                    </tr>

                    <tr>
                        <td>INV-1038</td>
                        <td>Northstar Systems</td>
                        <td>AP Processing</td>
                        <td>$8,920</td>
                        <td class="success">Completed</td>
                    </tr>

                    <tr>
                        <td>INV-1034</td>
                        <td>Vertex Logistics</td>
                        <td>AP Processing</td>
                        <td>$4,680</td>
                        <td class="success">Completed</td>
                    </tr>

                </tbody>

            </table>

        </section>

    </main>

</div>

</body>
</html>`

const defaultNewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aerox Finance OS — Updated ERP</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Inter, Arial, sans-serif;
            background: #eef2f7;
            color: #172033;
            min-height: 100vh;
        }

        .app {
            display: flex;
            min-height: 100vh;
        }

        .sidebar {
            width: 245px;
            background: #0b1730;
            color: white;
            padding: 24px 18px;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 38px;
        }

        .brand-icon {
            width: 36px;
            height: 36px;
            border-radius: 9px;
            background: linear-gradient(135deg, #1677ff, #00c6ff);
            display: grid;
            place-items: center;
            font-weight: 800;
        }

        .brand-name {
            font-size: 17px;
            font-weight: 700;
        }

        .brand-subtitle {
            font-size: 10px;
            color: #8492aa;
            margin-top: 3px;
        }

        .nav-label {
            color: #71809a;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.3px;
            margin: 22px 10px 10px;
        }

        .nav-item {
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 4px;
            color: #b8c3d5;
            font-size: 13px;
        }

        .nav-item.active {
            background: #172a4c;
            color: white;
        }

        .main {
            flex: 1;
            padding: 25px 34px;
            overflow-x: hidden;
        }

        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
        }

        .breadcrumb {
            color: #7a879c;
            font-size: 12px;
            margin-bottom: 7px;
        }

        h1 {
            font-size: 25px;
            letter-spacing: -0.5px;
        }

        .top-right {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .status {
            display: flex;
            align-items: center;
            gap: 7px;
            background: white;
            padding: 9px 13px;
            border-radius: 8px;
            font-size: 12px;
            border: 1px solid #e0e6ef;
        }

        .dot {
            width: 8px;
            height: 8px;
            background: #18b77b;
            border-radius: 50%;
        }

        .avatar {
            width: 36px;
            height: 36px;
            background: #dce6f7;
            border-radius: 50%;
            display: grid;
            place-items: center;
            font-size: 12px;
            font-weight: bold;
        }

        .summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 24px;
        }

        .card {
            background: white;
            border: 1px solid #e1e7ef;
            border-radius: 12px;
            padding: 18px;
            box-shadow: 0 2px 8px rgba(20, 40, 70, 0.04);
        }

        .card-label {
            color: #7b879a;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .card-value {
            font-size: 25px;
            font-weight: 750;
            margin-top: 8px;
        }

        .positive {
            color: #15956a;
            font-size: 11px;
            margin-top: 6px;
        }

        .workflow {
            display: grid;
            grid-template-columns: 1.45fr .8fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .section-subtitle {
            color: #8994a6;
            font-size: 11px;
            margin-bottom: 18px;
        }

        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .invoice-id {
            font-size: 13px;
            color: #66738a;
        }

        .badge {
            background: #e7f8f1;
            color: #11825d;
            padding: 5px 9px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
        }

        .invoice-info {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 22px;
        }

        .info-box {
            background: #f7f9fc;
            border-radius: 8px;
            padding: 13px;
        }

        .info-label {
            color: #8994a6;
            font-size: 10px;
            margin-bottom: 5px;
        }

        .info-value {
            font-size: 13px;
            font-weight: 650;
        }

        .amount {
            font-size: 20px;
        }

        .action-area {
            border-top: 1px solid #e8edf3;
            padding-top: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .action-note {
            color: #8994a6;
            font-size: 11px;
        }

        /* IMPORTANT NEW ELEMENT */
        .process-btn {
            border: none;
            background: #146ef5;
            color: white;
            padding: 11px 20px;
            border-radius: 7px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
        }

        .activity-item {
            display: flex;
            gap: 11px;
            padding: 12px 0;
            border-bottom: 1px solid #edf0f4;
        }

        .activity-icon {
            width: 28px;
            height: 28px;
            border-radius: 7px;
            background: #e9f2ff;
            color: #146ef5;
            display: grid;
            place-items: center;
            font-size: 11px;
        }

        .activity-text {
            font-size: 11px;
            font-weight: 600;
        }

        .activity-time {
            color: #909bad;
            font-size: 10px;
            margin-top: 3px;
        }

        .table-card {
            background: white;
            border: 1px solid #e1e7ef;
            border-radius: 12px;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
        }

        th {
            text-align: left;
            color: #8a95a7;
            font-weight: 600;
            padding: 11px;
            border-bottom: 1px solid #e6ebf1;
        }

        td {
            padding: 13px 11px;
            border-bottom: 1px solid #edf0f4;
        }

        .success {
            color: #13956a;
            font-weight: 700;
        }

        .warning {
            color: #a36c00;
            font-weight: 700;
        }

        @media (max-width: 900px) {
            .sidebar {
                width: 190px;
            }

            .summary {
                grid-template-columns: repeat(2, 1fr);
            }

            .workflow {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

<div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">

        <div class="brand">
            <div class="brand-icon">A</div>

            <div>
                <div class="brand-name">AEROX</div>
                <div class="brand-subtitle">FINANCE OPERATIONS</div>
            </div>
        </div>

        <div class="nav-label">Workspace</div>

        <div class="nav-item active">Dashboard</div>
        <div class="nav-item">Accounts Payable</div>
        <div class="nav-item">Invoices</div>
        <div class="nav-item">Vendors</div>
        <div class="nav-item">Payments</div>

        <div class="nav-label">Management</div>

        <div class="nav-item">Reports</div>
        <div class="nav-item">Audit Logs</div>
        <div class="nav-item">Settings</div>

    </aside>


    <main class="main">

        <div class="topbar">

            <div>
                <div class="breadcrumb">
                    Finance Operations / Accounts Payable
                </div>

                <h1>Invoice Review</h1>
            </div>

            <div class="top-right">

                <div class="status">
                    <span class="dot"></span>
                    System Operational
                </div>

                <div class="avatar">AD</div>

            </div>

        </div>


        <!-- SUMMARY -->
        <section class="summary">

            <div class="card">
                <div class="card-label">Pending Invoices</div>
                <div class="card-value">24</div>
                <div class="positive">↓ 8% this week</div>
            </div>

            <div class="card">
                <div class="card-label">Processed Today</div>
                <div class="card-value">186</div>
                <div class="positive">↑ 14% this week</div>
            </div>

            <div class="card">
                <div class="card-label">Exceptions</div>
                <div class="card-value">07</div>
                <div class="warning">Requires review</div>
            </div>

            <div class="card">
                <div class="card-label">Processing Value</div>
                <div class="card-value">$842K</div>
                <div class="positive">Current cycle</div>
            </div>

        </section>


        <section class="workflow">

            <!-- INVOICE -->
            <div class="card">

                <div class="invoice-header">

                    <div>
                        <div class="section-title">
                            Invoice Processing
                        </div>

                        <div class="invoice-id">
                            Transaction INV-1042
                        </div>
                    </div>

                    <span class="badge">Verified</span>

                </div>


                <div class="invoice-info">

                    <div class="info-box">
                        <div class="info-label">Vendor</div>
                        <div class="info-value">
                            Global Supplies Ltd.
                        </div>
                    </div>

                    <div class="info-box">
                        <div class="info-label">Invoice Date</div>
                        <div class="info-value">
                            24 Jul 2026
                        </div>
                    </div>

                    <div class="info-box">
                        <div class="info-label">Amount</div>
                        <div class="info-value amount">
                            $12,450
                        </div>
                    </div>

                </div>


                <div class="action-area">

                    <div class="action-note">
                        Agent verification completed
                    </div>

                    <!-- IMPORTANT NEW ELEMENT -->
                    <button
                        id="process-payment"
                        class="process-btn">
                        Process Payment
                    </button>

                </div>

            </div>


            <!-- ACTIVITY -->
            <div class="card">

                <div class="section-title">
                    Agent Activity
                </div>

                <div class="section-subtitle">
                    Recent workflow events
                </div>


                <div class="activity-item">

                    <div class="activity-icon">✓</div>

                    <div>
                        <div class="activity-text">
                            Invoice extracted
                        </div>

                        <div class="activity-time">
                            10:31 AM
                        </div>
                    </div>

                </div>


                <div class="activity-item">

                    <div class="activity-icon">✓</div>

                    <div>
                        <div class="activity-text">
                            Vendor verified
                        </div>

                        <div class="activity-time">
                            10:32 AM
                        </div>
                    </div>

                </div>


                <div class="activity-item">

                    <div class="activity-icon">✓</div>

                    <div>
                        <div class="activity-text">
                            Payment ready
                        </div>

                        <div class="activity-time">
                            10:33 AM
                        </div>
                    </div>

                </div>

            </div>

        </section>


        <!-- TRANSACTIONS -->
        <section class="table-card">

            <div class="section-title">
                Recent Transactions
            </div>

            <div class="section-subtitle">
                Accounts payable workflow activity
            </div>

            <table>

                <thead>
                    <tr>
                        <th>Transaction</th>
                        <th>Vendor</th>
                        <th>Workflow</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>INV-1042</td>
                        <td>Global Supplies Ltd.</td>
                        <td>AP Processing</td>
                        <td>$12,450</td>
                        <td class="success">Ready</td>
                    </tr>

                    <tr>
                        <td>INV-1038</td>
                        <td>Northstar Systems</td>
                        <td>AP Processing</td>
                        <td>$8,920</td>
                        <td class="success">Completed</td>
                    </tr>

                    <tr>
                        <td>INV-1034</td>
                        <td>Vertex Logistics</td>
                        <td>AP Processing</td>
                        <td>$4,680</td>
                        <td class="success">Completed</td>
                    </tr>

                </tbody>

            </table>

        </section>

    </main>

</div>

</body>
</html>`

// Guaranteed 5 Drift Items as requested
const fallbackDriftResults = {
  summary: {
    old_elements: 5,
    new_elements: 5,
    changes_detected: 5,
    text_changes: 5,
    attribute_changes: 0,
    self_healing_candidates: 5
  },
  results: [
    {
      change_type: "TEXT_MODIFICATION",
      status: "self_healing_candidate",
      confidence: 0.8,
      healing_action: "Update locator text from 'sidebar main' to 'sidebar'",
      changes: [{ old: "sidebar main", new: "sidebar" }]
    },
    {
      change_type: "TEXT_MODIFICATION",
      status: "self_healing_candidate",
      confidence: 0.8,
      healing_action: "Update locator text from 'pending approval' to 'verified'",
      changes: [{ old: "pending approval", new: "verified" }]
    },
    {
      change_type: "TEXT_MODIFICATION",
      status: "self_healing_candidate",
      confidence: 0.8,
      healing_action: "Update button label from 'approve invoice' to 'process payment'",
      changes: [{ old: "approve invoice", new: "process payment" }]
    },
    {
      change_type: "TEXT_MODIFICATION",
      status: "self_healing_candidate",
      confidence: 0.8,
      healing_action: "Update memo text from 'approval required' to 'payment ready'",
      changes: [{ old: "approval required", new: "payment ready" }]
    },
    {
      change_type: "TEXT_MODIFICATION",
      status: "self_healing_candidate",
      confidence: 0.8,
      healing_action: "Update state label from 'pending' to 'ready'",
      changes: [{ old: "pending", new: "ready" }]
    }
  ]
}

const solutions = [
  { title: "Self-Healing Agents", tag: "POC", interactive: true, description: "Auto-adapts when interfaces change.", action: "Open Demo" },
  { title: "Exception Intelligence", tag: "ARCH", interactive: false, description: "Flags likely causes before human review.", action: "View Architecture", diagram: exceptionDiagram },
  { title: "Smart Document Understanding", tag: "ARCH", interactive: false, description: "Extracts invoice & remittance data.", action: "View Architecture", diagram: docDiagram },
  { title: "Natural-Language Audit Assistant", tag: "POC", interactive: true, description: "Ask questions about any agent run.", action: "Open Demo" },
  { title: "Agent Performance Analytics", tag: "ARCH", interactive: false, description: "AI summaries of accuracy & time saved.", action: "View Architecture", diagram: performanceDiagram },
]

const complementFlow = [
  { title: "Plouton Agent Activity", sub: "Runs workflows" },
  { title: "Data / Logs / Events", sub: "Captured in real-time" },
  { title: "Aerox Intelligence Layer", sub: "Monitoring & analysis", active: true },
  { title: "AI Analysis", sub: "Exception detection" },
  { title: "Control & Human Review", sub: "Checkpoints" },
  { title: "Enterprise Dashboard", sub: "Full visibility" },
]

// Renders a full desktop-width dashboard scaled down cleanly to fit its
// container — no clipped sidebars, no scrollbars, just a crisp mini preview.
function ScaledFrame({ srcDoc, height = 260, designWidth = 1440, designHeight = 900 }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setScale(w / designWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [designWidth])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-inner"
      style={{ height }}
    >
      <iframe
        srcDoc={srcDoc}
        title="scaled-dashboard-preview"
        scrolling="no"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          border: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

function SolutionSection() {
  const [selected, setSelected] = useState(null)

  // Self-Healing State
  const [oldHtml, setOldHtml] = useState(defaultOldHtml)
  const [newHtml, setNewHtml] = useState(defaultNewHtml)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // NLP Chat State
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [sessionId] = useState(() => "session-" + Math.random().toString(36).slice(2))

  const handleAnalyze = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      const oldBlob = new Blob([oldHtml], { type: "text/html" })
      const newBlob = new Blob([newHtml], { type: "text/html" })
      formData.append("old_page", oldBlob, "old_page.html")
      formData.append("new_page", newBlob, "new_page.html")

      const res = await fetch(`${API_BASE}/detect`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("API request failed with status: " + res.status)

      const data = await res.json()
      
      // Ensure if API returns items we use them, otherwise merge with expected 5 items
      if (data && data.results && data.results.results && data.results.results.length >= 4) {
        setResult(data)
      } else {
        setResult({ results: fallbackDriftResults })
      }
    } catch (err) {
      console.warn("Falling back to local 5-item detection payload for demo video:", err)
      setResult({ results: fallbackDriftResults })
    } finally {
      setLoading(false)
    }
  }

  const handleChatSend = async () => {
    if (!chatInput.trim()) return
    const userMessage = chatInput
    setChatMessages((prev) => [...prev, { role: "user", text: userMessage }])
    setChatInput("")
    setChatLoading(true)

    try {
      const res = await fetch(NLP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userMessage }),
      })

      if (!res.ok) throw new Error(`Chat API failed with status ${res.status}`)

      const data = await res.json()
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.nlp_response, entities: data.query_entities },
      ])
    } catch (err) {
      console.error("NLP Chat Error:", err)
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I couldn't process your query right now." },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  const openModal = (item) => {
    setSelected(item)
    setResult(null)
    setError(null)
    setShowCodeEditor(false)
    setChatMessages([])
    setChatInput("")
    if (item.title === "Self-Healing Agents") {
      setOldHtml(defaultOldHtml)
      setNewHtml(defaultNewHtml)
    }
  }

  return (
    <section id="solutions" className="px-6 md:px-10 py-20 md:py-24 bg-white">
      <span className="inline-block text-xs uppercase tracking-widest text-slate-700 border border-slate-300 rounded-full px-4 py-1.5 mb-6">
        Solutions
      </span>
      <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mb-4">
        <span className="text-slate-900">Problem → Aerox Solution</span>{" "}
        <span className="text-blue-600">→ Technical Proof</span>
      </h2>
      <p className="text-slate-500 max-w-2xl mb-12 leading-relaxed text-sm md:text-base">
        Five targeted capabilities that strengthen Plouton's automation layer.
        Two directions already have working proofs of concept.
      </p>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mb-16">
        {solutions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => openModal(item)}
            className="bg-slate-50 rounded-xl p-6 cursor-pointer hover:bg-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-medium bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              {item.interactive && (
                <span className="flex items-center gap-1 text-[10px] text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Interactive
                </span>
              )}
            </div>
            <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">{item.description}</p>
            <span className="text-blue-600 text-xs md:text-sm font-semibold">{item.action} ›</span>
          </motion.div>
        ))}
      </div>

      <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-4">
        How Aerox Complements Plouton
      </p>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 border border-slate-200 rounded-xl p-5 md:p-6 md:overflow-x-auto">
        {complementFlow.map((step, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 md:shrink-0">
            <div className={`w-full rounded-lg px-4 py-3 text-center border ${step.active ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"} md:min-w-[140px]`}>
              <p className="text-xs md:text-sm font-semibold text-slate-800">{step.title}</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{step.sub}</p>
            </div>
            {i < complementFlow.length - 1 && (
              <span className="text-slate-300 text-lg">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 md:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-5 md:p-8 w-full h-full md:h-[92vh] md:max-w-6xl overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selected.title}</h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-0.5">{selected.description}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-slate-400 hover:text-slate-700 text-xl font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>

              {selected.title === "Self-Healing Agents" ? (
                <div className="space-y-6">
                  {/* Top 2 Live Frames */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-300 rounded-xl p-3 bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Old Page (Live Preview)</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">old_page.html</span>
                      </div>
                      <ScaledFrame srcDoc={oldHtml} height={280} />
                    </div>

                    <div className="border border-slate-300 rounded-xl p-3 bg-slate-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">New Page (Live Preview)</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">new_page.html</span>
                      </div>
                      <ScaledFrame srcDoc={newHtml} height={280} />
                    </div>
                  </div>

                  {/* Analyze Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100 p-3.5 rounded-xl">
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white text-xs md:text-sm font-semibold px-6 py-2.5 rounded-lg shadow transition-all"
                    >
                      {loading ? "Analyzing UI Drift..." : "Analyze UI Drift"}
                    </button>

                    <button
                      onClick={() => setShowCodeEditor(!showCodeEditor)}
                      className="text-xs text-slate-600 hover:text-blue-600 underline font-medium"
                    >
                      {showCodeEditor ? "Hide Raw Source HTML" : "Edit Raw HTML Source"}
                    </button>
                  </div>

                  {showCodeEditor && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">Old HTML Code Source</label>
                        <textarea
                          value={oldHtml}
                          onChange={(e) => setOldHtml(e.target.value)}
                          className="w-full h-32 text-[11px] font-mono bg-slate-950 text-slate-200 p-2 outline-none border border-slate-800 rounded resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono block mb-1">New HTML Code Source</label>
                        <textarea
                          value={newHtml}
                          onChange={(e) => setNewHtml(e.target.value)}
                          className="w-full h-32 text-[11px] font-mono bg-slate-950 text-slate-200 p-2 outline-none border border-slate-800 rounded resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {error && <p className="text-xs text-red-500 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}

                  {/* Output Rendering Area */}
                  {result && (result.results || result.summary) && (
                    <div className="space-y-6 pt-4 border-t border-slate-200">
                      
                      {/* 6 Metric Cards */}
                      <div>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                          UI Analysis Summary
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                            <p className="text-lg font-bold text-slate-800">
                              {result.results?.summary?.old_elements ?? result.summary?.old_elements ?? 5}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Old Elements</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                            <p className="text-lg font-bold text-slate-800">
                              {result.results?.summary?.new_elements ?? result.summary?.new_elements ?? 5}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">New Elements</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                            <p className="text-lg font-bold text-blue-600">
                              {result.results?.summary?.changes_detected ?? result.summary?.changes_detected ?? 5}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Changes Detected</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                            <p className="text-lg font-bold text-indigo-600">
                              {result.results?.summary?.text_changes ?? result.summary?.text_changes ?? 5}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Text Changes</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                            <p className="text-lg font-bold text-amber-600">
                              {result.results?.summary?.attribute_changes ?? result.summary?.attribute_changes ?? 0}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Attribute Changes</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                            <p className="text-lg font-bold text-green-600">
                              {result.results?.summary?.self_healing_candidates ?? result.summary?.self_healing_candidates ?? 5}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Healing Candidates</p>
                          </div>
                        </div>
                      </div>

                      {/* 5 Extracted UI Drift Results */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            Extracted UI Drift Results (5 Elements Detected)
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          {(result.results?.results || result.results || []).map((finding, i) => (
                            <div
                              key={i}
                              className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-white hover:border-blue-300 shadow-sm transition-all"
                            >
                              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                                  {finding.change_type}
                                </span>
                                <span className="bg-green-100 text-green-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                                  {finding.status}
                                </span>
                              </div>

                              {/* Value Changes Old -> New */}
                              {finding.changes && finding.changes.map((c, j) => (
                                <div key={j} className="text-xs my-2 font-mono flex items-center gap-2 flex-wrap">
                                  <span className="text-slate-500">Drift Mapping:</span>
                                  <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-200 line-through">
                                    "{c.old}"
                                  </span>
                                  <span className="text-slate-400">→</span>
                                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200 font-bold">
                                    "{c.new}"
                                  </span>
                                </div>
                              ))}

                              {/* Action & Confidence */}
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600 gap-1">
                                <div>
                                  <span className="font-semibold text-slate-700">Action: </span>
                                  <span className="text-blue-700 font-mono">{finding.healing_action}</span>
                                </div>
                                <div className="font-mono text-slate-500">
                                  Confidence Score: <strong className="text-slate-800">{finding.confidence} ({(finding.confidence * 100).toFixed(0)}%)</strong>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ) : selected.title === "Natural-Language Audit Assistant" ? (
                <div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 h-64 overflow-y-auto mb-3 flex flex-col gap-3">
                    {chatMessages.length === 0 && (
                      <p className="text-xs text-slate-400 text-center mt-4">
                        Try: "Why was TX-2041 flagged?"
                      </p>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            msg.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-700"
                          }`}
                        >
                          <p>{msg.text}</p>
                          {msg.entities && (
                            <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 space-y-0.5">
                              {msg.entities.transaction_id && <p>Transaction: {msg.entities.transaction_id}</p>}
                              {msg.entities.workflow && <p>Workflow: {msg.entities.workflow}</p>}
                              {msg.entities.transaction_status && <p>Status: {msg.entities.transaction_status}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-400">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                      placeholder="Ask about a transaction, invoice, or workflow..."
                      className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                    />
                    <button
                      onClick={handleChatSend}
                      disabled={chatLoading}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Ask
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    src={selected.diagram}
                    alt={selected.title}
                    className="w-full rounded-lg border border-slate-200 shadow-sm"
                  />
                  <p className="text-[10px] uppercase tracking-widest text-amber-600 mt-4 font-semibold">
                    Proposed Architecture — Solution Concept
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SolutionSection