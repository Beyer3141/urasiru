import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { basicInfoSchema, type BasicInfo } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import CustomRadio from '@/components/ui/custom-radio';
import { years, months, getDaysInMonth } from '@/lib/constants';

interface BasicInfoStepProps {
  onNext: (data: BasicInfo) => void;
  defaultValues?: BasicInfo;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ onNext, defaultValues }) => {
  const form = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: defaultValues || {
      fullName: '',
      birthYear: new Date().getFullYear() - 30,
      birthMonth: 1,
      birthDay: 1,
      gender: 'male'
    }
  });

  const watchBirthYear = form.watch('birthYear');
  const watchBirthMonth = form.watch('birthMonth');
  
  // Calculate days in the selected month
  const daysInMonth = React.useMemo(() => {
    if (!watchBirthYear || !watchBirthMonth) return Array.from({ length: 31 }, (_, i) => i + 1);
    return Array.from({ length: getDaysInMonth(watchBirthYear, watchBirthMonth) }, (_, i) => i + 1);
  }, [watchBirthYear, watchBirthMonth]);

  const onSubmit = (data: BasicInfo) => {
    onNext(data);
  };

  return (
    <div className="animate-fade-in">
      <h3 className="font-heading text-xl font-bold text-primary mb-6">基本情報</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>お名前</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="山田 太郎" 
                    {...field} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>生年（西暦）</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      >
                        <option value="">選択してください</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birthMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>月</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      >
                        <option value="">選択</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birthDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>日</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      >
                        <option value="">選択</option>
                        {daysInMonth.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormLabel className="block text-sm font-medium mb-1">性別</FormLabel>
            <div className="flex space-x-6 mt-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <>
                    <CustomRadio
                      label="男性"
                      checked={field.value === 'male'}
                      onChange={() => field.onChange('male')}
                      name={field.name}
                    />
                    <CustomRadio
                      label="女性"
                      checked={field.value === 'female'}
                      onChange={() => field.onChange('female')}
                      name={field.name}
                    />
                    <CustomRadio
                      label="その他"
                      checked={field.value === 'other'}
                      onChange={() => field.onChange('other')}
                      name={field.name}
                    />
                  </>
                )}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button type="submit" className="px-6 py-2 bg-primary text-white font-medium rounded-full shadow hover:shadow-md transition-all">
              次へ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicInfoStep;
