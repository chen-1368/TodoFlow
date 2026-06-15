import { User, Bell, Palette, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

interface InputItem {
  label: string;
  description: string;
  type: 'input';
  value: string;
  onChange: (value: string) => void;
}

interface ToggleItem {
  label: string;
  description: string;
  type: 'toggle';
  value: boolean;
  onChange: (value: boolean) => void;
}

interface InfoItem {
  label: string;
  description: string;
  type: 'info';
  value: string;
}

type SettingsItem = InputItem | ToggleItem | InfoItem;

interface SettingsGroup {
  title: string;
  icon: React.ElementType;
  items: SettingsItem[];
}

export function SettingsPage() {
  const [name, setName] = useState('用户');
  const [email, setEmail] = useState('user@example.com');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const settingsGroups: SettingsGroup[] = [
    {
      title: '账户设置',
      icon: User,
      items: [
        {
          label: '用户名',
          description: '您的显示名称',
          type: 'input',
          value: name,
          onChange: setName,
        },
        {
          label: '邮箱地址',
          description: '用于接收通知和重置密码',
          type: 'input',
          value: email,
          onChange: setEmail,
        },
      ],
    },
    {
      title: '通知设置',
      icon: Bell,
      items: [
        {
          label: '浏览器通知',
          description: '接收任务提醒和更新通知',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          label: '邮件通知',
          description: '通过邮件接收重要更新',
          type: 'toggle',
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
      ],
    },
    {
      title: '外观',
      icon: Palette,
      items: [
        {
          label: '主题模式',
          description: '亮色模式',
          type: 'info',
          value: '亮色',
        },
      ],
    },
  ];

  const bottomLinks = [
    { icon: Shield, label: '隐私设置', description: '管理您的数据和隐私' },
    { icon: HelpCircle, label: '帮助中心', description: '获取使用帮助' },
    { icon: LogOut, label: '退出登录', description: '安全退出您的账户', isDanger: true },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-semibold">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <group.icon className="w-5 h-5 text-gray-400" />
              <h3 className="font-semibold text-gray-900">{group.title}</h3>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {group.items.map((item, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">{item.label}</label>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className="flex items-center">
                    {item.type === 'input' && (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => item.onChange(e.target.value)}
                        className="w-48 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    )}
                    {item.type === 'toggle' && (
                      <button
                        onClick={() => item.onChange(!item.value)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          item.value ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    {item.type === 'info' && (
                      <span className="text-sm text-gray-500">{item.value}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">其他设置</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {bottomLinks.map((link) => (
            <button
              key={link.label}
              className={`w-full px-6 py-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors ${
                link.isDanger ? 'text-red-500 hover:text-red-600' : 'text-gray-700'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <div className="flex-1">
                <span className="text-sm font-medium">{link.label}</span>
                <p className="text-xs text-gray-500">{link.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>保存更改</Button>
      </div>
    </div>
  );
}
