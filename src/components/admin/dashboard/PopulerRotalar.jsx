import { Pie } from '@ant-design/charts';

const PopulerRotalar = ({ rotalar }) => {
  const config = {
    data: rotalar,
    angleField: 'sayi',
    colorField: 'rota',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="h-[300px]">
      <Pie {...config} />
    </div>
  );
};

export default PopulerRotalar; 