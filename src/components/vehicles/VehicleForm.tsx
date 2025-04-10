
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Vehicle, VehicleFormInput, VehicleStatus } from "@/types/vehicle";

// Define the form validation schema using zod
const vehicleFormSchema = z.object({
  vehicle_id: z.string().min(1, "Vehicle ID is required"),
  depot: z.string().min(1, "Depot is required"),
  odo_reading: z.union([z.number().min(0).nullable(), z.literal("")]).transform(val => 
    val === "" ? null : typeof val === "string" ? parseInt(val) : val
  ),
  soc: z.union([z.number().min(0).max(100).nullable(), z.literal("")]).transform(val => 
    val === "" ? null : typeof val === "string" ? parseInt(val) : val
  ),
  imei_no: z.string().length(15, "IMEI No. must be exactly 15 digits").regex(/^\d+$/, "IMEI No. must contain only digits"),
  registration_no: z.string().min(1, "Registration No. is required"),
  chassis_no: z.string().min(1, "Chassis No. is required"),
  engine_no: z.string().min(1, "Engine No. is required"),
  device_make: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE", "CHARGING"]),
  remarks: z.string().optional(),
});

const statusOptions: { label: string; value: VehicleStatus }[] = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Maintenance", value: "MAINTENANCE" },
  { label: "Charging", value: "CHARGING" },
];

interface VehicleFormProps {
  initialData?: Vehicle;
  onSubmit: (data: VehicleFormInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function VehicleForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: VehicleFormProps) {
  const [submitting, setSubmitting] = useState(false);

  // Initialize form with default values or existing vehicle data
  const form = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: initialData ? {
      vehicle_id: initialData.vehicle_id,
      depot: initialData.depot,
      odo_reading: initialData.odo_reading,
      soc: initialData.soc,
      imei_no: initialData.imei_no,
      registration_no: initialData.registration_no,
      chassis_no: initialData.chassis_no,
      engine_no: initialData.engine_no,
      device_make: initialData.device_make || "",
      status: initialData.status,
      remarks: initialData.remarks || "",
    } : {
      vehicle_id: "",
      depot: "",
      odo_reading: null,
      soc: null,
      imei_no: "",
      registration_no: "",
      chassis_no: "",
      engine_no: "",
      device_make: "",
      status: "INACTIVE",
      remarks: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof vehicleFormSchema>) => {
    try {
      setSubmitting(true);
      await onSubmit(values as VehicleFormInput);
      toast({
        title: initialData ? "Vehicle updated" : "Vehicle created",
        description: `Vehicle ${values.vehicle_id} was ${initialData ? "updated" : "created"} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save vehicle",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="vehicle_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depot</FormLabel>
                <FormControl>
                  <Input placeholder="Enter depot" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="odo_reading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ODO Reading</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter ODO reading"
                    {...field}
                    value={field.value === null ? '' : field.value}
                    onChange={e => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SoC (State of Charge)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter SoC (0-100)"
                    {...field}
                    value={field.value === null ? '' : field.value}
                    onChange={e => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Value between 0 and 100</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imei_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IMEI No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter 15-digit IMEI no." {...field} />
                </FormControl>
                <FormDescription>Must be exactly 15 digits</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registration_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter registration no." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chassis_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chassis No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter chassis no." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="engine_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Engine No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter engine no." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="device_make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device Make</FormLabel>
                <FormControl>
                  <Input placeholder="Enter device make" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map(option => (
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
        </div>

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter remarks" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting || isLoading}>
            {submitting || isLoading ? "Saving..." : initialData ? "Update Vehicle" : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
