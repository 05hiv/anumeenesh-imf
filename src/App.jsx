import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Award, Users, FileText, PhoneCall, UserCheck, Menu, X, ArrowRight, Download, Upload, Zap } from 'lucide-react';
import * as XLSX from 'xlsx';

// Initialize sample data with Unique IDs, Emails, and Passwords in localStorage
const initializeSampleData = () => {
  const existingUsers = localStorage.getItem('anumeenesh_users');
  if (!existingUsers) {
    const sampleUsers = [
      // Agents
      { id: 'AGT_001', name: 'Shivam', email: 'shivam@anumeenesh.com', password: '123', role: 'agent', phone: '9876543210', panCard: 'SHIV1234A', aadhaarCard: '[Aadhaar Redacted]', referredBy: '' },
      { id: 'AGT_002', name: 'Deepak Gupta', email: 'deepak@anumeenesh.com', password: '123', role: 'agent', phone: '9876543211', panCard: 'DEEP1234B', aadhaarCard: '[Aadhaar Redacted]', referredBy: '' },
      { id: 'AGT_003', name: 'Santosh Tiwari', email: 'santosh@anumeenesh.com', password: '123', role: 'agent', phone: '9876543212', panCard: 'SANT1234C', aadhaarCard: '[Aadhaar Redacted]', referredBy: '' },
      
      // Customers under Shivam
      { id: 'CUST_101', name: 'Aman', email: 'aman@gmail.com', password: '123', role: 'customer', phone: '9123456780', panCard: 'AMAN1234X', aadhaarCard: '[Aadhaar Redacted]', referredBy: 'Shivam' },
      { id: 'CUST_102', name: 'Deepak', email: 'deepak.cust@gmail.com', password: '123', role: 'customer', phone: '9123456781', panCard: 'CUST1234Y', aadhaarCard: '[Aadhaar Redacted]', referredBy: 'Shivam' },

      // Customers under Deepak Gupta
      { id: 'CUST_103', name: 'Santosh', email: 'santosh.cust@gmail.com', password: '123', role: 'customer', phone: '9123456782', panCard: 'SANT5678X', aadhaarCard: '[Aadhaar Redacted]', referredBy: 'Deepak Gupta' },
      { id: 'CUST_104', name: 'Mitali', email: 'mitali@gmail.com', password: '123', role: 'customer', phone: '9123456783', panCard: 'MITA1234Z', aadhaarCard: '[Aadhaar Redacted]', referredBy: 'Deepak Gupta' },

      // Customers under Santosh Tiwari
      { id: 'CUST_105', name: 'Shivam Sharma', email: 'shivam.sharma@gmail.com', password: '123', role: 'customer', phone: '9123456784', panCard: 'SHIV5678Z', aadhaarCard: '[Aadhaar Redacted]', referredBy: 'Santosh Tiwari' },
      { id: 'CUST_106', name: 'Tarun Mathur', email: 'tarun@gmail.com', password: '123', role: 'customer', phone: '9123456785', panCard: 'TARU1234Z', aadhaarCard: '[Aadhaar Redacted]', referredBy: 'Santosh Tiwari' }
    ];
    localStorage.setItem('anumeenesh_users', JSON.stringify(sampleUsers));
  }

  const existingQueries = localStorage.getItem('anumeenesh_queries');
  if (!existingQueries) {
    const sampleQueries = [
      { id: 'Q_01', name: 'Rahul Verma', email: 'rahul@gmail.com', phone: '9811223344', message: 'I want to know more about Life Insurance plans.', date: '2026-11-16' }
    ];
    localStorage.setItem('anumeenesh_queries', JSON.stringify(sampleQueries));
  }
};

initializeSampleData();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="bg-brandBlue text-white sticky top-0 z-50 border-b-2 border-brandGold shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-brandGold text-brandBlue font-black text-2xl px-3 py-1 rounded shadow">A</div>
            <div>
              <span className="text-lg font-bold tracking-wider text-brandGold">ANUMEENESH</span>
              <span className="block text-xs tracking-widest text-gray-300">IMF PVT. LTD.</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-6 items-center font-medium">
            <Link to="/" className="hover:text-brandGold transition">Home</Link>
            <Link to="/about" className="hover:text-brandGold transition">About Us</Link>
            <Link to="/gallery" className="hover:text-brandGold transition">Gallery</Link>
            <Link to="/documents" className="hover:text-brandGold transition">Documents</Link>
            <Link to="/contact" className="hover:text-brandGold transition">Contact Us</Link>
            
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-brandGold text-sm font-bold">Hi, {currentUser.name} ({currentUser.role})</span>
                <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1.5 rounded-md font-bold text-sm hover:bg-red-700 transition">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="bg-brandGold text-brandBlue px-4 py-2 rounded-md font-bold hover:bg-yellow-500 transition shadow">Login</Link>
                <Link to="/signup" className="border border-brandGold text-brandGold px-4 py-2 rounded-md font-bold hover:bg-brandGold hover:text-brandBlue transition">Sign Up</Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brandGold">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brandBlue px-4 pt-2 pb-4 space-y-2 border-t border-gray-700">
          <Link to="/" onClick={()=>setIsOpen(false)} className="block py-2 hover:text-brandGold">Home</Link>
          <Link to="/about" onClick={()=>setIsOpen(false)} className="block py-2 hover:text-brandGold">About Us</Link>
          <Link to="/gallery" onClick={()=>setIsOpen(false)} className="block py-2 hover:text-brandGold">Gallery</Link>
          <Link to="/documents" onClick={()=>setIsOpen(false)} className="block py-2 hover:text-brandGold">Documents</Link>
          <Link to="/contact" onClick={()=>setIsOpen(false)} className="block py-2 hover:text-brandGold">Contact Us</Link>
          {currentUser ? (
            <button onClick={()=>{handleLogout(); setIsOpen(false);}} className="block py-2 text-red-400 font-bold">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={()=>setIsOpen(false)} className="block py-2 text-brandGold font-bold">Login</Link>
              <Link to="/signup" onClick={()=>setIsOpen(false)} className="block py-2 text-brandGold font-bold">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="bg-gradient-to-r from-brandBlue via-blue-900 to-brandBlue text-white py-20 px-4 text-center border-b-4 border-brandGold">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="bg-brandGold text-brandBlue text-xs uppercase font-extrabold px-3 py-1 rounded-full">Insurance Marketing Firm</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-brandGold">Plan Smart. Live Better.</h1>
          <p className="text-xl text-gray-200">Secure Your Financial Future with Our Comprehensive Insurance Solutions</p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/signup" className="bg-brandGold text-brandBlue font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-400 transition flex items-center gap-2">
              Get Started <ArrowRight size={18}/>
            </Link>
            <Link to="/contact" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-brandBlue transition">
              Contact Advisor
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brandBlue">Our Core Insurance Solutions</h2>
          <p className="text-gray-600 mt-2">Secure Today... Prosper Tomorrow...</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Life Insurance", desc: "Financial security, peace of mind, and life-long protection for your family.", icon: <ShieldCheck className="text-brandGold" size={36}/> },
            { title: "Health Insurance", desc: "Quality healthcare, cashless treatments, and absolute worry-free living.", icon: <UserCheck className="text-brandGold" size={36}/> },
            { title: "General Insurance", desc: "Complete motor, travel, home, and business asset protection.", icon: <Award className="text-brandGold" size={36}/> },
            { title: "Retirement Planning", desc: "Build a safe, healthy, and secure tomorrow for your golden years.", icon: <Users className="text-brandGold" size={36}/> },
          ].map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-brandGold">
              <div className="mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-brandBlue mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold text-brandBlue mb-6 text-center">About Anumeenesh IMF Pvt. Ltd.</h1>
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Anumeenesh IMF Pvt. Ltd.</strong> is a premier Insurance Marketing Firm committed to delivering expert guidance, financial security, and fulfilling career plans under standard regulatory frameworks.
        </p>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold text-brandBlue mb-4 text-center">Company Gallery & Achievements</h1>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        {['Office Welcome Banner', 'Utkrisht Samman Event', 'Annual Career Achievers'].map((title, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
            <div className="h-48 bg-gradient-to-tr from-brandBlue to-blue-700 flex items-center justify-center text-brandGold font-bold text-xl p-4 text-center">
              {title}
            </div>
            <div className="p-4"><p className="text-gray-700 font-medium">Anumeenesh IMF Official Program</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Documents() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold text-brandBlue mb-6 text-center">Official Documents & Career Plan</h1>
      <div className="bg-white p-8 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold text-brandBlue">Career Plan & Commission Structure</h2>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brandBlue text-brandGold">
                <th className="p-3">Rank</th>
                <th className="p-3">Commission</th>
                <th className="p-3">Target</th>
                <th className="p-3">Prize / Incentive</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-3 font-semibold">Advisor</td><td className="p-3">15%</td><td className="p-3">1 Lac</td><td className="p-3">3L / 7L / 15L milestones</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">Performer</td><td className="p-3">10%</td><td className="p-3">3 Lac</td><td className="p-3">Monthly TA Support</td></tr>
              <tr className="border-b"><td className="p-3 font-semibold">Leader</td><td className="p-3">4%</td><td className="p-3">81 Lac</td><td className="p-3">Monthly Salary + Perks</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const queries = JSON.parse(localStorage.getItem('anumeenesh_queries') || '[]');
    const newQueryId = `Q_${Date.now().toString().slice(-4)}`;
    queries.push({ ...formData, id: newQueryId, date: new Date().toLocaleDateString() });
    localStorage.setItem('anumeenesh_queries', JSON.stringify(queries));
    alert('Enquiry submitted successfully! Our team will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold text-brandBlue mb-6 text-center">Get in Touch With Us</h1>
      <div className="bg-white p-8 rounded-xl shadow border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block font-medium text-gray-700">Full Name</label><input type="text" required value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full mt-1 p-3 border rounded-lg" /></div>
          <div><label className="block font-medium text-gray-700">Email Address</label><input type="email" required value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full mt-1 p-3 border rounded-lg" /></div>
          <div><label className="block font-medium text-gray-700">Phone Number</label><input type="tel" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full mt-1 p-3 border rounded-lg" /></div>
          <div><label className="block font-medium text-gray-700">Message / Query</label><textarea rows="4" required value={formData.message} onChange={(e)=>setFormData({...formData, message: e.target.value})} className="w-full mt-1 p-3 border rounded-lg"></textarea></div>
          <button type="submit" className="w-full bg-brandBlue text-brandGold font-bold py-3 rounded-lg shadow">Send Enquiry</button>
        </form>
      </div>
    </div>
  );
}

function Login() {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === "admin@anumeenesh.com" && password === "admin123" && role === "admin") {
      const adminUser = { id: 'ADM_01', name: 'Admin', role: 'admin', email: 'admin@anumeenesh.com', password: 'admin123' };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      navigate('/admin-dashboard');
      return;
    }

    const users = JSON.parse(localStorage.getItem('anumeenesh_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password && u.role === role);

    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'agent') navigate('/agent-dashboard');
      else navigate('/customer-dashboard');
    } else {
      alert('Invalid login credentials or role.');
    }
  };

  const directLoginAdmin = () => {
    const adminUser = { id: 'ADM_01', name: 'Admin', role: 'admin', email: 'admin@anumeenesh.com', password: 'admin123' };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    navigate('/admin-dashboard');
  };

  const directLoginAgent = (agentEmail) => {
    const users = JSON.parse(localStorage.getItem('anumeenesh_users') || '[]');
    const found = users.find(u => u.email === agentEmail && u.role === 'agent');
    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      navigate('/agent-dashboard');
    }
  };

  const directLoginCustomer = (custEmail) => {
    const users = JSON.parse(localStorage.getItem('anumeenesh_users') || '[]');
    const found = users.find(u => u.email === custEmail && u.role === 'customer');
    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      navigate('/customer-dashboard');
    }
  };

  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brandGold space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-brandBlue text-center mb-2">Portal Login</h2>
          <p className="text-center text-xs text-gray-500">Select role & enter credentials or use Direct Quick Login below</p>
        </div>

        <div className="p-4 bg-yellow-50 border border-brandGold rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-brandBlue font-bold text-sm">
            <Zap size={16} className="text-yellow-600" /> Direct One-Click Test Login:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={directLoginAdmin} className="bg-brandBlue text-brandGold text-xs font-bold py-2 px-3 rounded shadow hover:bg-blue-900 transition">
              🚀 Direct Admin Login
            </button>
            <button type="button" onClick={() => directLoginAgent('shivam@anumeenesh.com')} className="bg-brandGold text-brandBlue text-xs font-bold py-2 px-3 rounded shadow hover:bg-yellow-500 transition">
              ⚡ Direct Agent (Shivam)
            </button>
            <button type="button" onClick={() => directLoginCustomer('aman@gmail.com')} className="bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded shadow hover:bg-blue-800 transition">
              ⚡ Direct Customer (Aman)
            </button>
            <button type="button" onClick={() => directLoginCustomer('tarun@gmail.com')} className="bg-green-700 text-white text-xs font-bold py-2 px-3 rounded shadow hover:bg-green-800 transition">
              ⚡ Direct Customer (Tarun)
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 font-semibold text-brandBlue">
              <option value="customer">Customer</option>
              <option value="agent">Agent / Advisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div><label className="block font-medium text-gray-700">Email Address</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full mt-1 p-3 border rounded-lg" placeholder="Enter email" /></div>
          <div><label className="block font-medium text-gray-700">Password</label><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full mt-1 p-3 border rounded-lg" placeholder="••••••••" /></div>
          <button type="submit" className="w-full bg-brandGold text-brandBlue font-bold py-3 rounded-lg shadow">Login to Console</button>
        </form>
      </div>
    </div>
  );
}

function Signup() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref') || '';
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'customer',
    phone: '', panCard: '', aadhaarCard: '[Aadhaar Redacted]', referredBy: refCode
  });
  
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('anumeenesh_users') || '[]');
    if(users.some(u => u.email === formData.email)) {
      alert('User with this email already exists!');
      return;
    }

    const uniqueId = formData.role === 'agent' 
      ? `AGT_${Math.floor(100 + Math.random() * 900)}` 
      : `CUST_${Math.floor(100 + Math.random() * 900)}`;

    const newUser = { ...formData, id: uniqueId, createdAt: new Date().toLocaleDateString() };
    users.push(newUser);
    localStorage.setItem('anumeenesh_users', JSON.stringify(users));
    alert(`Registration successful! Your Unique ID is ${uniqueId}. Redirecting to login.`);
    navigate('/login');
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brandGold">
        <div className="text-center mb-6">
          <span className="bg-brandBlue text-brandGold text-xs uppercase font-extrabold px-3 py-1 rounded-full">Anumeenesh IMF Pvt. Ltd.</span>
          <h2 className="text-3xl font-bold text-brandBlue mt-2">Registration Form</h2>
        </div>

        {formData.referredBy && (
          <div className="mb-6 p-3 bg-yellow-50 border border-brandGold rounded text-sm text-brandBlue font-medium">
            Registering under Agent: <strong>{formData.referredBy}</strong>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div><label className="block font-medium text-gray-700 text-sm">Full Name *</label><input type="text" required className="w-full mt-1 p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, name: e.target.value})} /></div>
          <div><label className="block font-medium text-gray-700 text-sm">Email Address *</label><input type="email" required className="w-full mt-1 p-3 border rounded-lg" onChange={(e)=>setFormData({...formData, email: e.target.value})} /></div>
          <div><label className="block font-medium text-gray-700 text-sm">Password *</label><input type="password" required className="w-full mt-1 p-3 border rounded-lg" placeholder="••••••••" onChange={(e)=>setFormData({...formData, password: e.target.value})} /></div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 text-sm">Register As *</label>
              <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50 font-semibold text-brandBlue" onChange={(e)=>setFormData({...formData, role: e.target.value})}>
                <option value="customer">Customer</option>
                <option value="agent">Agent / Advisor</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm">Agent Name / Referral (Optional)</label>
              <input type="text" value={formData.referredBy} placeholder="e.g. Shivam" className="w-full mt-1 p-3 border rounded-lg bg-gray-50" onChange={(e)=>setFormData({...formData, referredBy: e.target.value})} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block font-medium text-gray-700 text-sm">Aadhaar Number *</label><input type="text" required placeholder="1234 5678 9012" className="w-full mt-1 p-3 border rounded-lg font-mono" onChange={(e)=>setFormData({...formData, aadhaarCard: e.target.value})} /></div>
            <div><label className="block font-medium text-gray-700 text-sm">PAN Number *</label><input type="text" required placeholder="ABCDE1234F" className="w-full mt-1 p-3 border rounded-lg font-mono uppercase" onChange={(e)=>setFormData({...formData, panCard: e.target.value})} /></div>
          </div>

          <button type="submit" className="w-full bg-brandBlue text-brandGold font-bold py-3 rounded-lg shadow hover:bg-blue-900 transition">Complete Registration</button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('anumeenesh_users') || '[]');
    const allQueries = JSON.parse(localStorage.getItem('anumeenesh_queries') || '[]');
    setUsers(allUsers);
    setQueries(allQueries);
  }, []);

  const exportToExcelFile = () => {
    if (users.length === 0) {
      alert("No records found to export.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Anumeenesh_All_Users");
    XLSX.writeFile(workbook, "Anumeenesh_IMF_Database.xlsx");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-brandBlue">Admin Console</h1>
        <button onClick={exportToExcelFile} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow">
          <Download size={18} /> Export All Data to Excel (.xlsx)
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-brandGold">
          <h3 className="text-gray-500 font-medium">Total Registered</h3>
          <p className="text-3xl font-bold text-brandBlue mt-2">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600">
          <h3 className="text-gray-500 font-medium">Total Agents</h3>
          <p className="text-3xl font-bold text-brandBlue mt-2">{users.filter(u => u.role === 'agent').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-600">
          <h3 className="text-gray-500 font-medium">Total Customers</h3>
          <p className="text-3xl font-bold text-brandBlue mt-2">{users.filter(u => u.role === 'customer').length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-500 font-medium">Contact Queries</h3>
          <p className="text-3xl font-bold text-brandBlue mt-2">{queries.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-bold text-brandBlue mb-4">All Registered Users, Agents & Credentials Database</h2>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-brandBlue text-brandGold">
              <th className="p-3">Unique ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Email ID</th>
              <th className="p-3">Password</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Assigned Agent</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="7" className="p-4 text-center text-gray-500">No users registered yet.</td></tr>
            ) : (
              users.map((u, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-blue-900">{u.id}</td>
                  <td className="p-3 font-semibold">{u.name}</td>
                  <td className="p-3 uppercase text-xs font-bold text-blue-800">{u.role}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 font-mono text-red-600 font-bold">{u.password}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3 font-semibold text-green-700">{u.referredBy || 'Direct / None'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-bold text-brandBlue mb-4">Contact Us Enquiries & Queries</h2>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-brandGold text-brandBlue">
              <th className="p-3">Query ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {queries.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">No contact queries received yet.</td></tr>
            ) : (
              queries.map((q, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold">{q.id}</td>
                  <td className="p-3">{q.date}</td>
                  <td className="p-3 font-semibold">{q.name}</td>
                  <td className="p-3">{q.email}</td>
                  <td className="p-3">{q.phone}</td>
                  <td className="p-3">{q.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgentDashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{"name": "Shivam", "email": "shivam@anumeenesh.com"}');
  const referralLink = `${window.location.origin}${window.location.pathname}#/signup?ref=${encodeURIComponent(currentUser.name)}`;

  const allUsers = JSON.parse(localStorage.getItem('anumeenesh_users') || '[]');
  const myCustomers = allUsers.filter(u => u.role === 'customer' && u.referredBy?.toLowerCase() === currentUser.name.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-brandBlue">Agent Console: {currentUser.name} (ID: {currentUser.id})</h1>
      
      <div className="bg-white p-6 rounded-xl shadow border-t-4 border-brandGold">
        <h2 className="font-bold text-lg text-brandBlue mb-2">Your Direct Customer Referral Link</h2>
        <p className="text-gray-600 text-sm mb-4">Share this link to register customers under your name automatically:</p>
        <div className="flex gap-4">
          <input type="text" readOnly value={referralLink} className="w-full p-3 bg-gray-100 border rounded-lg text-sm select-all font-mono" />
          <button type="button" onClick={()=>{navigator.clipboard.writeText(referralLink); alert('Referral link copied!');}} className="bg-brandGold text-brandBlue font-bold px-6 py-3 rounded-lg shadow">Copy</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-bold text-brandBlue mb-4">Customers Registered Under {currentUser.name} ({myCustomers.length})</h2>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-brandBlue text-brandGold">
              <th className="p-3">Customer ID</th>
              <th className="p-3">Customer Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">PAN</th>
              <th className="p-3">Aadhaar</th>
            </tr>
          </thead>
          <tbody>
            {myCustomers.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">No customers registered under you yet.</td></tr>
            ) : (
              myCustomers.map((c, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-blue-900">{c.id}</td>
                  <td className="p-3 font-semibold">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3 font-mono">{c.panCard}</td>
                  <td className="p-3 font-mono">{c.aadhaarCard}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomerDashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-brandBlue">Customer Dashboard: {currentUser.name} (ID: {currentUser.id})</h1>
      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-brandGold">
        <h2 className="font-bold text-xl text-brandBlue">Your Assigned Agent / Advisor</h2>
        <p className="text-gray-700 mt-2 font-medium">Assigned Agent Name: <span className="text-green-700 font-bold">{currentUser.referredBy || 'Direct Company Support'}</span></p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600">
        <h2 className="font-bold text-xl text-brandBlue">Your Active Insurance Policies</h2>
        <p className="text-gray-600 mt-1">Direct link to Life, Health, and General Insurance protection plans.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Routes>
        </main>
        <footer className="bg-brandBlue text-white text-center py-6 border-t-2 border-brandGold text-sm">
          <p>© {new Date().getFullYear()} Anumeenesh IMF Pvt. Ltd. All Rights Reserved. | Secure Today... Prosper Tomorrow...</p>
        </footer>
      </div>
    </Router>
  );
}