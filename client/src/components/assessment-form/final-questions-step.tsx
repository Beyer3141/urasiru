import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { finalQuestionsSchema, type FinalQuestions } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { challengeOptions, lifeFocusOptions } from '@/lib/constants';

interface FinalQuestionsStepProps {
  onNext: (data: FinalQuestions) => void;
  onPrev: () => void;
  defaultValues?: FinalQuestions;
  isSubmitting?: boolean;
}

const FinalQuestionsStep: React.FC<FinalQuestionsStepProps> = ({
  onNext,
  onPrev,
  defaultValues,
  isSubmitting = false
}) => {
  const form = useForm<FinalQuestions>({
    resolver: zodResolver(finalQuestionsSchema),
    defaultValues: defaultValues || {
      lifeFocus: '',
      challenges: [],
      strengths: ''
    }
  });

  const onSubmit = (data: FinalQuestions) => {
    onNext(data);
  };

  return (
    <div className="animate-fade-in">
      <h3 className="font-heading text-xl font-bold text-primary mb-6">補足質問</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="lifeFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>現在のライフステージで最も重視していることは？</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lifeFocusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="challenges"
            render={() => (
              <FormItem>
                <FormLabel>現在直面している課題は？（複数選択可）</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {challengeOptions.map(option => (
                    <FormField
                      key={option.value}
                      control={form.control}
                      name="challenges"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.value}
                            className="flex items-start p-2 hover:bg-gray-50 rounded-md"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValues, option.value])
                                    : field.onChange(
                                        currentValues.filter(
                                          (value) => value !== option.value
                                        )
                                      );
                                }}
                                className="mt-1 h-4 w-4 text-primary rounded focus:ring-primary"
                              />
                            </FormControl>
                            <FormLabel className="ml-2 font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="strengths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>自分の強みだと思うものは？</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="例: 忍耐強さ、創造性、論理的思考、共感力など"
                    rows={3}
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              onClick={onPrev}
              variant="outline"
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-all"
            >
              戻る
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary text-white font-medium rounded-full shadow hover:shadow-md transition-all"
            >
              {isSubmitting ? "診断中..." : "診断結果を見る"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FinalQuestionsStep;
